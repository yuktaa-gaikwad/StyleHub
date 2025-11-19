'use server'

import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'
import { createClient } from '@/lib/supabase/server'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export async function createCheckoutSession(
  items: CartItem[],
  paymentMethod: 'card' | 'upi' | 'cod',
  userEmail?: string
) {
  
  // For COD, we don't create a Stripe session
  if (paymentMethod === 'cod') {
    return { clientSecret: null, sessionId: null, paymentMethod: 'cod' }
  }

  // Prepare line items for Stripe
  const lineItems = items.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
        description: `Product ID: ${item.id}`,
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }))

  try {
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      redirect_on_completion: 'never',
      line_items: lineItems,
      mode: 'payment',
      customer_email: userEmail,
      metadata: {
        paymentMethod,
      },
    })

    return { clientSecret: session.client_secret, sessionId: session.id, paymentMethod }
  } catch (error) {
    console.error('Stripe session error:', error)
    throw new Error('Failed to create payment session')
  }
}

export async function saveOrderWithPayment(
  items: CartItem[],
  paymentMethod: 'card' | 'upi' | 'cod',
  shippingAddress: string,
  phoneNumber: string,
  stripeSessionId?: string
) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    throw new Error('User not authenticated')
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  // Create order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user.id,
      total_amount: total,
      payment_method: paymentMethod,
      payment_status: paymentMethod === 'cod' ? 'pending' : 'completed',
      stripe_session_id: stripeSessionId,
      shipping_address: shippingAddress,
      phone_number: phoneNumber,
    })
    .select()

  if (orderError || !order) {
    throw new Error('Failed to create order')
  }

  // Add order items
  const orderItems = items.map((item) => ({
    order_id: order[0].id,
    product_id: item.id,
    quantity: item.quantity,
    price_at_purchase: item.price,
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)

  if (itemsError) {
    throw new Error('Failed to add items to order')
  }

  return order[0]
}

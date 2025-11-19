import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface OrderRequest {
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>
  paymentMethod: 'card' | 'upi' | 'cod'
  shippingAddress: string
  phoneNumber: string
  stripeSessionId?: string
  userId: string
}

export async function POST(request: NextRequest) {
  try {
    const body: OrderRequest = await request.json()
    
    if (!body.userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = await createClient()

    // Validate input
    if (!body.items || !body.shippingAddress || !body.phoneNumber) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const subtotal = body.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.1
    const total = subtotal + tax

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: body.userId,
        total_amount: total,
        payment_method: body.paymentMethod,
        payment_status: body.paymentMethod === 'cod' ? 'pending' : 'processing',
        stripe_session_id: body.stripeSessionId,
        shipping_address: body.shippingAddress,
        phone_number: body.phoneNumber,
      })
      .select()

    if (orderError || !order) {
      console.error('Order creation error:', orderError)
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      )
    }

    // Add order items
    const orderItems = body.items.map((item) => ({
      order_id: order[0].id,
      product_id: item.id,
      quantity: item.quantity,
      price_at_purchase: item.price,
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Order items error:', itemsError)
      return NextResponse.json(
        { error: 'Failed to add items to order' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      id: order[0].id,
      total: total,
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') as string

  let event: any

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = await createClient()

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        console.log('[v0] Payment successful for session:', session.id)

        // Update order payment status
        const { error: updateError } = await supabase
          .from('orders')
          .update({
            payment_status: 'completed',
            stripe_session_id: session.id,
          })
          .eq('stripe_session_id', session.id)

        if (updateError) {
          console.error('[v0] Error updating order:', updateError)
          return NextResponse.json(
            { error: 'Failed to update order' },
            { status: 500 }
          )
        }

        console.log('[v0] Order updated successfully')
        break
      }

      case 'checkout.session.async_payment_failed': {
        const session = event.data.object
        console.log('[v0] Payment failed for session:', session.id)

        // Update order payment status
        await supabase
          .from('orders')
          .update({
            payment_status: 'failed',
          })
          .eq('stripe_session_id', session.id)

        break
      }

      case 'charge.refunded': {
        const charge = event.data.object
        console.log('[v0] Charge refunded:', charge.id)

        // Update order if needed
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[v0] Webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

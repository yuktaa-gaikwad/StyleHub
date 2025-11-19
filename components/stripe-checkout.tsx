'use client'

import { useState, useCallback } from 'react'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { createCheckoutSession } from '@/app/actions/checkout'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface StripeCheckoutProps {
  items: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>
  paymentMethod: 'card' | 'upi'
  shippingAddress: string
  phoneNumber: string
  userEmail: string
}

export default function StripeCheckout({
  items,
  paymentMethod,
  shippingAddress,
  phoneNumber,
  userEmail,
}: StripeCheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleFetchClientSecret = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await createCheckoutSession(items, paymentMethod, userEmail)
      if (result.clientSecret) {
        setClientSecret(result.clientSecret)
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
      alert('Failed to initialize payment. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [items, paymentMethod, userEmail])

  if (!clientSecret && !isLoading) {
    return (
      <Button
        onClick={handleFetchClientSecret}
        disabled={!shippingAddress || !phoneNumber}
        className="w-full"
        size="lg"
      >
        Proceed to Payment
      </Button>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <p>Loading payment form...</p>
      </div>
    )
  }

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  )
}

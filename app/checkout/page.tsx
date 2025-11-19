'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navigation from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import StripeCheckout from '@/components/stripe-checkout'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export default function CheckoutPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card')
  const [shippingAddress, setShippingAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [pageLoaded, setPageLoaded] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) {
      router.push('/sign-in')
      return
    }

    const userData = JSON.parse(user)
    setUserEmail(userData.email)

    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(cart)
    setPageLoaded(true)
  }, [router])

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const handleCODCheckout = async () => {
    if (!shippingAddress || !phoneNumber) {
      alert('Please fill in all shipping details')
      return
    }

    setIsProcessing(true)
    try {
      // Simulate order creation
      const orderId = 'ORD-' + Date.now()
      localStorage.removeItem('cart')
      router.push(`/order-success?orderId=${orderId}`)
    } catch (error) {
      console.error('Checkout error:', error)
      alert('An error occurred during checkout')
    } finally {
      setIsProcessing(false)
    }
  }

  if (!pageLoaded) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <p>Your cart is empty</p>
          <Button onClick={() => router.push('/shop')}>Continue Shopping</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userEmail}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="address">Shipping Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter your complete shipping address"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="cursor-pointer">
                        Debit/Credit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="upi" id="upi" />
                      <Label htmlFor="upi" className="cursor-pointer">
                        UPI Payment
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="cursor-pointer">
                        Cash on Delivery
                      </Label>
                    </div>
                  </RadioGroup>

                  {(paymentMethod === 'card' || paymentMethod === 'upi') && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <StripeCheckout
                        items={cartItems}
                        paymentMethod={paymentMethod}
                        shippingAddress={shippingAddress}
                        phoneNumber={phoneNumber}
                        userEmail={userEmail}
                      />
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-green-800 mb-4">
                        You will pay ${total.toFixed(2)} when your order is delivered.
                      </p>
                      <Button
                        onClick={handleCODCheckout}
                        disabled={isProcessing || !shippingAddress || !phoneNumber}
                        className="w-full"
                        size="lg"
                      >
                        {isProcessing ? 'Processing...' : 'Place Order (COD)'}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} x {item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (10%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

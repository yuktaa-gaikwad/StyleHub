'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]')
    setCartItems(cart)
    setIsLoading(false)
  }, [])

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }

    const updated = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item
    )
    setCartItems(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const removeItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id)
    setCartItems(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('cart')
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const handleCheckout = () => {
    const user = localStorage.getItem('user')
    
    if (!user) {
      router.push('/sign-in')
      return
    }

    router.push('/checkout')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
          <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cartItems.length === 0 ? (
                <Card>
                  <CardContent className="pt-12 text-center">
                    <p className="text-muted-foreground mb-6">
                      Your cart is empty
                    </p>
                    <Link href="/shop">
                      <Button>Continue Shopping</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">{item.name}</h3>
                            <p className="text-muted-foreground">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                −
                              </Button>
                              <span className="w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                +
                              </Button>
                            </div>

                            <p className="w-24 text-right font-semibold">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>

                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => removeItem(item.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
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

                    <Button
                      onClick={handleCheckout}
                      className="w-full"
                      size="lg"
                    >
                      Proceed to Checkout
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>

                    <Link href="/shop" className="block">
                      <Button variant="ghost" className="w-full">
                        Continue Shopping
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

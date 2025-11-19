'use client'

import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function OrderSuccessContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')

  return (
    <Card className="border-green-200 bg-green-50">
      <CardHeader>
        <CardTitle className="text-green-800">Order Placed Successfully!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-green-700">
          Thank you for your order. Your order has been received and is being processed.
        </p>
        {orderId && (
          <div className="p-4 bg-white rounded border border-green-200">
            <p className="text-sm text-muted-foreground">Order ID</p>
            <p className="text-lg font-mono font-semibold">{orderId}</p>
          </div>
        )}
        <p className="text-sm text-green-700">
          You will receive a confirmation email with order details and tracking information.
        </p>

        <div className="flex gap-4 pt-4">
          <Link href="/shop">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
          <Link href="/account">
            <Button>View Orders</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

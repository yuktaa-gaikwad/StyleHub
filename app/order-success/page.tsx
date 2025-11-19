import { Suspense } from 'react'
import Navigation from '@/components/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import OrderSuccessContent from './order-success-content'

function OrderSuccessLoading() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">Order Placed Successfully!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700">Loading order details...</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="flex-1">
        <div className="max-w-2xl mx-auto px-4 py-12">
          <Suspense fallback={<OrderSuccessLoading />}>
            <OrderSuccessContent />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

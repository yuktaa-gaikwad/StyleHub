import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Navigation from '@/components/navigation'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="flex-1">
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 text-balance">
              Welcome to StyleHub
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Discover premium clothing and fashion that express your unique style
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/shop">
                <Button size="lg">Shop Now</Button>
              </Link>
              <Link href="/sign-in">
                <Button size="lg" variant="outline">Sign In</Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 md:px-8 bg-secondary">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose StyleHub?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-xl font-semibold mb-2">Curated Selection</h3>
                <p className="text-muted-foreground">Hand-picked clothing for style and quality</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🚚</div>
                <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
                <p className="text-muted-foreground">Quick delivery to your doorstep</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                <p className="text-muted-foreground">Durable and fashionable pieces</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

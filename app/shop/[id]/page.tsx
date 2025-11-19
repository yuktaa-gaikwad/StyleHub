'use client'

import { useParams } from 'next/navigation'
import Navigation from '@/components/navigation'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/add-to-cart-button'

const SAMPLE_PRODUCTS: any = {
  '1': {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    price: 29.99,
    category: 'Clothing',
    description: 'High-quality cotton t-shirt in multiple colors',
    detailed_description: 'Made from 100% organic cotton, this t-shirt is perfect for everyday wear. Available in 10 different colors.',
    image_url: '/cotton-tshirt.jpg',
    stock: 15,
  },
  '2': {
    id: '2',
    name: 'Denim Jeans',
    price: 59.99,
    category: 'Bottoms',
    description: 'Classic blue denim jeans with comfort fit',
    detailed_description: 'Premium denim jeans with a comfortable fit. Perfect for casual wear and long-lasting durability.',
    image_url: '/denim-jeans.jpg',
    stock: 8,
  },
  '3': {
    id: '3',
    name: 'Casual Hoodie',
    price: 49.99,
    category: 'Outerwear',
    description: 'Warm and comfortable hoodie for everyday wear',
    detailed_description: 'Soft fleece hoodie perfect for chilly days. Features a spacious kangaroo pocket and adjustable drawstrings.',
    image_url: '/casual-hoodie.jpg',
    stock: 12,
  },
  '4': {
    id: '4',
    name: 'Athletic Shorts',
    price: 34.99,
    category: 'Activewear',
    description: 'Breathable shorts perfect for sports and fitness',
    detailed_description: 'Moisture-wicking athletic shorts designed for maximum comfort during workouts. Includes inner lining.',
    image_url: '/athletic-shorts.jpg',
    stock: 20,
  },
  '5': {
    id: '5',
    name: 'Leather Jacket',
    price: 129.99,
    category: 'Outerwear',
    description: 'Stylish leather jacket for a classic look',
    detailed_description: 'Genuine leather jacket with a timeless design. Perfect for adding style to any outfit.',
    image_url: '/leather-jacket.jpg',
    stock: 5,
  },
  '6': {
    id: '6',
    name: 'Summer Dress',
    price: 44.99,
    category: 'Dresses',
    description: 'Elegant summer dress perfect for warm days',
    detailed_description: 'Light and breathable summer dress in elegant designs. Great for beach days or casual outings.',
    image_url: '/summer-dress.jpg',
    stock: 10,
  },
  '7': {
    id: '7',
    name: 'Casual Blazer',
    price: 89.99,
    category: 'Outerwear',
    description: 'Professional blazer for business casual outfits',
    detailed_description: 'Perfect blazer for professional settings or business casual occasions. Tailored fit for a polished look.',
    image_url: '/casual-blazer.jpg',
    stock: 6,
  },
  '8': {
    id: '8',
    name: 'White Sneakers',
    price: 79.99,
    category: 'Footwear',
    description: 'Comfortable and stylish white sneakers',
    detailed_description: 'Clean white sneakers that go with everything. Comfortable cushioning for all-day wear.',
    image_url: '/white-sneakers.jpg',
    stock: 18,
  },
}

export default function ProductPage() {
  const params = useParams()
  const id = params.id as string
  const product = SAMPLE_PRODUCTS[id]

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex items-center justify-center bg-muted rounded-lg h-96">
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                  {product.category}
                </p>
                <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                <p className="text-2xl font-semibold text-primary mb-6">
                  ${product.price.toFixed(2)}
                </p>

                <div className="space-y-6 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{product.description}</p>
                  </div>

                  {product.detailed_description && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Details</h3>
                      <p className="text-muted-foreground">
                        {product.detailed_description}
                      </p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Availability</h3>
                    <p className={`${
                      product.stock > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}>
                      {product.stock > 0
                        ? `${product.stock} in stock`
                        : "Out of stock"}
                    </p>
                  </div>
                </div>
              </div>

              <AddToCartButton
                productId={product.id}
                productName={product.name}
                price={product.price}
                available={product.stock > 0}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/navigation'
import ProductCard from '@/components/product-card'

interface Product {
  id: string
  name: string
  price: number
  description: string
  image_url?: string
}

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    price: 29.99,
    description: 'High-quality cotton t-shirt in multiple colors',
    image_url: '/cotton-tshirt.jpg',
  },
  {
    id: '2',
    name: 'Denim Jeans',
    price: 59.99,
    description: 'Classic blue denim jeans with comfort fit',
    image_url: '/denim-jeans.jpg',
  },
  {
    id: '3',
    name: 'Casual Hoodie',
    price: 49.99,
    description: 'Warm and comfortable hoodie for everyday wear',
    image_url: '/casual-hoodie.jpg',
  },
  {
    id: '4',
    name: 'Athletic Shorts',
    price: 34.99,
    description: 'Breathable shorts perfect for sports and fitness',
    image_url: '/athletic-shorts.jpg',
  },
  {
    id: '5',
    name: 'Leather Jacket',
    price: 129.99,
    description: 'Stylish leather jacket for a classic look',
    image_url: '/leather-jacket.jpg',
  },
  {
    id: '6',
    name: 'Summer Dress',
    price: 44.99,
    description: 'Elegant summer dress perfect for warm days',
    image_url: '/summer-dress.jpg',
  },
  {
    id: '7',
    name: 'Casual Blazer',
    price: 89.99,
    description: 'Professional blazer for business casual outfits',
    image_url: '/casual-blazer.jpg',
  },
  {
    id: '8',
    name: 'White Sneakers',
    price: 79.99,
    description: 'Comfortable and stylish white sneakers',
    image_url: '/white-sneakers.jpg',
  },
]

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading products
    setProducts(SAMPLE_PRODUCTS)
    setIsLoading(false)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
          <h1 className="text-4xl font-bold mb-2">Shop Our Collection</h1>
          <p className="text-muted-foreground mb-12">
            Browse our carefully curated selection of premium clothing
          </p>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products available</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

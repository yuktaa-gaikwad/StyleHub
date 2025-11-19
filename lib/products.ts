export interface Product {
  id: string
  name: string
  description: string
  priceInCents: number
}

// Products from database will be fetched, but we keep this as reference
// The actual products are stored in Supabase
export const PRODUCTS: Product[] = []

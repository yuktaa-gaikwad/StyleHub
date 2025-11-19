# StyleHub - Quick Start Guide

Your online clothing store is now fully functional with Clerk authentication and working Stripe payments!

## What's Included

✓ **Clerk Authentication** - Secure user signup/login
✓ **Stripe Payment Processing** - Card and UPI payments
✓ **Cash on Delivery (COD)** - Order without payment
✓ **Order Management** - Track all orders and payments
✓ **Product Catalog** - Browse with detailed descriptions
✓ **Shopping Cart** - Add/remove items with quantity control

## Quick Setup (5 minutes)

### Step 1: Add Environment Variables
Copy `.env.local.example` to `.env.local` and fill in:

\`\`\`bash
# From Clerk Dashboard (https://dashboard.clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# From Stripe Dashboard (https://dashboard.stripe.com)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
\`\`\`

### Step 2: Run Database Migration
Execute this SQL in your Supabase dashboard:
\`\`\`sql
-- From scripts/003_update_schema_for_payments.sql
ALTER TABLE orders ADD COLUMN payment_method VARCHAR(50) DEFAULT 'upi';
ALTER TABLE orders ADD COLUMN payment_status VARCHAR(50) DEFAULT 'pending';
ALTER TABLE orders ADD COLUMN stripe_session_id VARCHAR(255);
ALTER TABLE orders ADD COLUMN shipping_address TEXT;
ALTER TABLE orders ADD COLUMN phone_number VARCHAR(20);
\`\`\`

### Step 3: Start Development
\`\`\`bash
npm run dev
# Visit http://localhost:3000
\`\`\`

## Testing the Payment System

### Test User Flow
1. **Sign Up**: Go to `/sign-up` and create test account
2. **Browse**: Visit `/shop` to see products
3. **Add to Cart**: Click "Add to Cart" on any product
4. **Checkout**: Go to `/cart` → "Proceed to Checkout"
5. **Select Payment**: Choose Card, UPI, or COD
6. **Complete Order**: See order confirmation
7. **Track Order**: View at `/account`

### Test Card Numbers (Stripe)
Use these in the payment form:

| Card Type | Number | Result |
|-----------|--------|--------|
| Visa | 4242 4242 4242 4242 | Success |
| Mastercard | 5555 5555 5555 4444 | Success |
| Visa (Decline) | 4000 0000 0000 0002 | Declined |

**Expiry**: Any future date
**CVC**: Any 3 digits

### Test Payment Methods

**Card Payment**
- Embedded Stripe checkout appears
- Use test card above
- Instant confirmation
- Status: "completed"

**UPI Payment**
- Stripe handles UPI routing
- Test same as card
- Status: "completed"

**Cash on Delivery**
- No payment form needed
- Order placed immediately
- Status: "pending" (waits for delivery)

## File Structure

\`\`\`
app/
├── sign-up/              # Clerk signup page
├── sign-in/              # Clerk login page
├── shop/                 # Product catalog
├── cart/                 # Shopping cart
├── checkout/             # Payment checkout
├── account/              # User orders & profile
├── order-success/        # Order confirmation
├── api/
│   ├── orders/create     # Create order
│   ├── orders/get        # Fetch user orders
│   └── webhooks/stripe   # Stripe payment updates

components/
├── stripe-checkout.tsx   # Embedded Stripe form
├── navigation.tsx        # Header with auth
└── ui/                   # UI components

lib/
├── stripe.ts             # Stripe configuration
└── supabase/             # Database clients
\`\`\`

## Key Flows

### Order Creation
1. User adds products to cart (localStorage)
2. Proceeds to checkout
3. Selects payment method
4. For COD: Order saved, payment_status = "pending"
5. For Card/UPI: Stripe session created
6. After payment: Webhook updates payment_status = "completed"

### User Authentication
1. User signs up with Clerk
2. Clerk manages sessions securely
3. Middleware protects checkout routes
4. User data tied to Clerk user ID

### Database Structure
\`\`\`
orders
├── id (UUID)
├── user_id (Clerk user ID)
├── total_amount
├── payment_method (card/upi/cod)
├── payment_status (pending/completed/failed)
├── stripe_session_id
├── shipping_address
└── phone_number

order_items
├── id
├── order_id
├── product_id
├── quantity
└── price_at_purchase
\`\`\`

## Troubleshooting

### "Authentication required" on checkout
- Make sure you're signed in with Clerk
- Check browser cookies are enabled
- Try clearing cookies and signing in again

### Payment form not showing
- Verify STRIPE_PUBLISHABLE_KEY is set
- Check browser console for errors
- Ensure Stripe test keys (pk_test_) are used

### Orders not saving
- Verify Supabase connection
- Check user is authenticated
- Ensure migration script was run

### Webhook not working
- Set STRIPE_WEBHOOK_SECRET correctly
- Go to Stripe Dashboard → Webhooks
- Add endpoint: `https://your-domain.com/api/webhooks/stripe`
- Select: checkout.session.completed

## Deployment

### Vercel
\`\`\`bash
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
vercel env add CLERK_SECRET_KEY
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_WEBHOOK_SECRET
vercel deploy
\`\`\`

### Update Stripe Webhook
1. Go to Stripe Dashboard
2. Settings → Webhooks
3. Update endpoint to: `https://your-domain.vercel.app/api/webhooks/stripe`
4. Re-copy webhook secret and update env var

## Next Steps

- Add product images to Supabase
- Customize email confirmations
- Implement shipping rates
- Build admin dashboard
- Add inventory tracking
- Set up abandoned cart emails

## Support

For issues:
1. Check console for error messages
2. Verify all env vars are set
3. Review PAYMENT_SETUP.md for detailed guide
4. Check Stripe/Clerk dashboards for API issues

**You're all set! Start selling now!**

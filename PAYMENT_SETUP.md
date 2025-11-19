# Payment System Setup Guide

## Overview
Your StyleHub online clothing store now has a complete payment system with:
- **Clerk Authentication** - User signup and login
- **Stripe Integration** - Card and UPI payments
- **Cash on Delivery (COD)** - Pay when item arrives
- **Order Management** - Track orders and payment status

## Environment Variables Required

### 1. Clerk Authentication
\`\`\`
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
\`\`\`
Get these from: https://dashboard.clerk.com

### 2. Stripe Payment
\`\`\`
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
\`\`\`
Get these from: https://dashboard.stripe.com

### 3. Supabase Database
All Supabase variables should already be configured.

## Database Setup

Run these SQL scripts to set up your database:

1. **003_update_schema_for_payments.sql** - Updates orders table with payment fields
2. Products should already be seeded from earlier scripts

## Testing Payment Flow

### Test Card Numbers (Stripe)
- **Visa**: 4242 4242 4242 4242
- **Mastercard**: 5555 5555 5555 4444
- Use any future expiry date and any 3-digit CVC

### Test Flow
1. Go to `/sign-up` to create account with Clerk
2. Browse products at `/shop`
3. Add items to cart
4. Go to `/cart` and click "Proceed to Checkout"
5. Fill shipping details
6. Choose payment method:
   - **Card**: Use test card numbers above (shows embedded Stripe form)
   - **UPI**: Simulates UPI payment (shows embedded Stripe form)
   - **COD**: Creates order immediately, pays on delivery
7. Complete payment or place COD order
8. View order confirmation at `/order-success`
9. Track orders at `/account`

## Payment Methods Supported

### 1. Debit/Credit Card (Stripe)
- Fully integrated with Stripe Embedded Checkout
- Secure payment processing
- Instant payment confirmation

### 2. UPI Payment
- Supported through Stripe's payment methods
- Popular in India
- Real-time payment confirmation

### 3. Cash on Delivery (COD)
- Order placed immediately with "pending" status
- Customer pays when package arrives
- No payment processing needed
- Perfect for customers without online payment methods

## Order Processing

### Order Creation
When checkout is completed:
1. Order created in Supabase with all details
2. Order items added to order_items table
3. Payment status set based on method:
   - **Card/UPI**: "processing" → "completed" (after Stripe confirmation)
   - **COD**: "pending" (waits for delivery and payment)

### Payment Webhook
Stripe sends webhook notifications to `/api/webhooks/stripe`:
- `checkout.session.completed` - Updates order to "completed"
- `checkout.session.async_payment_failed` - Updates order to "failed"
- `charge.refunded` - Handles refunds

## Key Features

### Order Tracking
- Users can view all their orders at `/account`
- Shows order number, date, total, and payment status
- Real-time status updates from Stripe

### Security
- All prices validated server-side (cannot be changed on client)
- Clerk handles user authentication securely
- Stripe handles payment data (PCI compliant)
- Row-level security on Supabase tables

### User Experience
- Smooth checkout flow
- Multiple payment options
- Order confirmation page
- Order history tracking
- Responsive design

## Troubleshooting

### Payment Not Going Through
1. Check Stripe API keys are correct
2. Verify webhook secret is set
3. Check Supabase connection
4. Review browser console for errors

### Clerk Not Working
1. Verify Clerk environment variables
2. Check Clerk dashboard for app setup
3. Ensure redirect URLs are configured

### Database Issues
1. Run migration scripts: `003_update_schema_for_payments.sql`
2. Verify products table is populated
3. Check Row-Level Security (RLS) policies

## API Endpoints

### POST /api/orders/create
Creates a new order with items and payment method.
**Protected**: Requires Clerk authentication

### POST /api/webhooks/stripe
Receives Stripe payment confirmations.
**Headers**: Includes Stripe signature for verification

### GET /api/orders/get
Retrieves user's orders.
**Protected**: Requires Clerk authentication

## Next Steps

1. Add product images to products table
2. Customize checkout email templates (if using Stripe)
3. Set up shipping rate calculation
4. Integrate with fulfillment service for COD tracking
5. Add admin dashboard to manage orders
\`\`\`

```ts file="" isHidden

# Setup Checklist

Use this to ensure everything is properly configured.

## Environment Variables
- [ ] NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY set
- [ ] CLERK_SECRET_KEY set
- [ ] NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY set (pk_test_)
- [ ] STRIPE_SECRET_KEY set (sk_test_)
- [ ] STRIPE_WEBHOOK_SECRET set (whsec_)
- [ ] All Supabase env vars still set

## Database
- [ ] Ran 001_create_tables.sql (creates base schema)
- [ ] Ran 002_seed_products.sql (adds sample products)
- [ ] Ran 003_update_schema_for_payments.sql (adds payment fields)
- [ ] Can connect to Supabase dashboard
- [ ] Products visible in products table
- [ ] Orders table has payment fields

## Clerk Setup
- [ ] Clerk app created at https://dashboard.clerk.com
- [ ] Application name set
- [ ] Publishable key copied correctly
- [ ] Secret key copied correctly
- [ ] Development URLs configured (localhost:3000)

## Stripe Setup
- [ ] Stripe account created at https://dashboard.stripe.com
- [ ] Using test keys (pk_test_ and sk_test_)
- [ ] Publishable key copied correctly
- [ ] Secret key copied correctly
- [ ] Webhook created for /api/webhooks/stripe
- [ ] Webhook events: checkout.session.completed selected

## Testing
- [ ] Can visit home page
- [ ] Can sign up with Clerk
- [ ] Can sign in with Clerk
- [ ] Can view products at /shop
- [ ] Can add products to cart
- [ ] Can proceed to checkout
- [ ] Shipping form displays
- [ ] Payment method selection works
- [ ] Can select COD and place order
- [ ] Can view order at /account
- [ ] Test card payment (4242... card)
- [ ] Payment completes successfully
- [ ] Order status updates to "completed"

## Deployment (Optional)
- [ ] Pushed code to GitHub
- [ ] Connected Vercel to GitHub
- [ ] Added all env vars to Vercel
- [ ] Domain configured in Clerk
- [ ] Stripe webhook updated for production domain
- [ ] Test order on deployed version
- [ ] Verified email receives order confirmation

## Common Issues Resolved
- [ ] Middleware properly configured for Clerk
- [ ] Checkout route protected by auth
- [ ] Stripe keys are test keys (not live)
- [ ] Database migrations applied
- [ ] All dependencies installed
- [ ] Navigation shows Login/Signup or Account/Logout correctly

✓ All checked? You're ready to launch!

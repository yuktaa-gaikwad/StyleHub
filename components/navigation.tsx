'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem('user')
    if (user) {
      const userData = JSON.parse(user)
      setIsLoggedIn(true)
      setUserName(userData.email?.split('@')[0] || 'User')
    }
    setIsLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('cart')
    setIsLoggedIn(false)
    window.location.href = '/'
  }

  if (isLoading) {
    return (
      <nav className="bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            StyleHub
          </Link>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          StyleHub
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/shop" className="hover:opacity-90 transition">
            Shop
          </Link>
          <Link href="/cart" className="hover:opacity-90 transition">
            Cart
          </Link>
          {isLoggedIn ? (
            <>
              <span className="text-sm">Welcome, {userName}</span>
              <Link href="/account" className="hover:opacity-90 transition">
                Account
              </Link>
              <Button size="sm" variant="secondary" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button size="sm" variant="secondary">
                  Login
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from 'next/navigation';

interface AddToCartButtonProps {
  productId: string;
  productName: string;
  price: number;
  available: boolean;
}

export default function AddToCartButton({
  productId,
  productName,
  price,
  available,
}: AddToCartButtonProps) {
  const [isAdded, setIsAdded] = useState(false);
  const router = useRouter();

  const handleAddToCart = () => {
    // Get existing cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // Check if product already in cart
    const existingItem = cart.find((item: any) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: productId,
        name: productName,
        price,
        quantity: 1,
      });
    }

    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart));

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Button
      onClick={handleAddToCart}
      disabled={!available}
      className="w-full"
      size="lg"
    >
      {isAdded ? "Added to cart!" : available ? "Add to Cart" : "Out of Stock"}
    </Button>
  );
}

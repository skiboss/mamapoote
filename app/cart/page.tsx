"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/CartContext"
import { useRouter } from "next/navigation"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { CheckoutModal } from "@/components/CheckoutModal"

export default function CartPage() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart()
  const router = useRouter()
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center space-y-6 py-16">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto" />
            <h1 className="text-3xl font-bold text-foreground">Your cart is empty</h1>
            <p className="text-muted-foreground text-lg">Looks like you haven't added any delicious meals yet.</p>
            <Button size="lg" asChild className="mt-6">
              <Link href="/menu">Browse Menu</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Your Cart</h1>
            <Button
              variant="outline"
              onClick={clearCart}
              className="text-destructive hover:text-destructive bg-transparent"
            >
              Clear Cart
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={`/.jpg?height=100&width=100&query=${encodeURIComponent(item.name + " African cuisine")}`}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg text-foreground">{item.name}</h3>
                            <p className="text-muted-foreground text-sm">{item.description}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Customizations */}
                        {item.customizations?.removedIngredients &&
                          item.customizations.removedIngredients.length > 0 && (
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-foreground">Removed ingredients:</p>
                              <div className="flex flex-wrap gap-1">
                                {item.customizations.removedIngredients.map((ingredient) => (
                                  <Badge key={ingredient} variant="secondary" className="text-xs">
                                    No {ingredient}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                        {item.customizations?.specialInstructions && (
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-foreground">Special instructions:</p>
                            <p className="text-sm text-muted-foreground italic">
                              {item.customizations.specialInstructions}
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="h-8 w-8"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="font-medium text-foreground w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="h-8 w-8"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <span className="font-bold text-lg text-accent">{item.price}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold text-foreground">Order Summary</h2>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span className="text-foreground">$3.99</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="text-foreground">${(total * 0.08).toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span className="text-foreground">Total</span>
                      <span className="text-accent">${(total + 3.99 + total * 0.08).toFixed(2)}</span>
                    </div>
                  </div>

                  <Button size="lg" className="w-full" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>

                  <Button variant="outline" size="lg" className="w-full bg-transparent" asChild>
                    <Link href="/menu">Continue Shopping</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <CheckoutModal isOpen={isCheckoutModalOpen} onClose={() => setIsCheckoutModalOpen(false)} />
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/CartContext"
import { useRouter } from "next/navigation"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Home } from "lucide-react"
import Link from "next/link"
import { CheckoutModal } from "@/components/CheckoutModal"

export default function CartPage() {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart()
  const router = useRouter()
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)

  /**
   * Handle quantity changes for cart items
   * Removes item if quantity goes below 1, otherwise updates quantity
   */
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  /**
   * Validate checkout eligibility
   * Ensures all soup items have a protein selection
   * Returns true if all items are ready for checkout
   */
  const canProceedToCheckout = () => {
    return items.every((item) => {
      // Check if item is a soup by looking at the meal data
      const isSoup = item.name.toLowerCase().includes("soup")

      if (isSoup) {
        // For soups, protein selection is required
        return item.soupCustomizations?.selectedProtein
      }

      // Non-soup items can always proceed
      return true
    })
  }

  /**
   * Handle checkout button click
   * Opens checkout modal if all validation passes
   */
  const handleCheckout = () => {
    if (canProceedToCheckout()) {
      setIsCheckoutModalOpen(true)
    }
  }

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center space-y-6 py-16">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto" />
            <h1 className="text-3xl font-bold text-foreground">Your cart is empty</h1>
            <p className="text-muted-foreground text-lg">Looks like you haven't added any delicious meals yet.</p>
            {/* Call-to-action buttons with alternating styles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 w-full max-w-md mx-auto">
              <Button size="lg" asChild variant="default">
                <Link href="/menu">Browse Menu</Link>
              </Button>

              <Button size="lg" asChild variant="outline">
                <Link href="/">Go Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Filled cart state

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header: Back navigation, title, and home button */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Your Cart</h1>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="rounded-full"
            >
              <Link href="/">
                <Home className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Clear cart action */}
          <div className="flex items-center justify-between">
            <div />
            <Button
              variant="outline"
              onClick={clearCart}
              className="text-destructive hover:text-destructive bg-transparent"
            >
              Clear Cart
            </Button>
          </div>

          {/* Main content: responsive grid layout (2-col on desktop, full width on mobile) */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Cart Items Section */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={`${item.image}?height=100&width=100&query=${encodeURIComponent(item.name + " African cuisine")}`}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg text-foreground">{item.name}</h3>
                            {/* <p className="text-muted-foreground text-sm">{item.description}</p> */}
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

                        {/* Display removed ingredients as badges */}
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

                        {/* Display special instructions if provided */}                        {item.customizations?.specialInstructions && (
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-foreground">Special instructions:</p>
                            <p className="text-sm text-muted-foreground italic">
                              {item.customizations.specialInstructions}
                            </p>
                          </div>
                        )}

                        {/* Display soup customization details with accent background */}
                        {item.soupCustomizations && (
                          <div className="space-y-2 bg-accent/10 p-3 rounded-lg">
                            <p className="text-sm font-medium text-foreground">Soup Customization:</p>
                            {/* Show selected protein with quantity */}
                            {item.soupCustomizations.selectedProtein && (
                              <p className="text-sm text-muted-foreground">
                                Protein:{" "}
                                <span className="font-medium text-foreground">
                                  {item.soupCustomizations.selectedProtein}
                                </span>
                                {item.soupCustomizations.proteinQuantity && (
                                  <span className="text-muted-foreground">
                                    {" "}
                                    x{item.soupCustomizations.proteinQuantity}
                                  </span>
                                )}
                              </p>
                            )}
                            {/* Show selected swallow with quantity */}
                            {item.soupCustomizations.selectedSwallow && (
                              <p className="text-sm text-muted-foreground">
                                Swallow:{" "}
                                <span className="font-medium text-foreground">
                                  {item.soupCustomizations.selectedSwallow}
                                </span>
                                {item.soupCustomizations.swallowQuantity && (
                                  <span className="text-muted-foreground">
                                    {" "}
                                    x{item.soupCustomizations.swallowQuantity}
                                  </span>
                                )}
                              </p>
                            )}
                            {/* Show warning if protein is not selected */}
                            {!item.soupCustomizations.selectedProtein && (
                              <p className="text-sm text-destructive font-medium">⚠️ Protein selection required</p>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2">
                          <div className="flex items-center space-x-3">
                            {/* Quantity control buttons */}
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
                          {/* Item price - using foreground for better visibility */}
                          <span className="font-bold text-lg text-foreground">{item.price}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary - sticky sidebar (right side on desktop) */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-semibold text-foreground">Order Summary</h2>

                  {/* Pricing breakdown */}
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
                    {/* Total price - using foreground for better visibility */}
                    <div className="flex justify-between font-semibold text-lg">
                      <span className="text-foreground">Total</span>
                      <span className="text-foreground">${(total + 3.99 + total * 0.08).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button size="lg" className="w-full" onClick={handleCheckout} disabled={!canProceedToCheckout()}>
                      Proceed to Checkout
                    </Button>
                    {!canProceedToCheckout() && (
                      <p className="text-xs text-destructive text-center">
                        Please customize soup items (select protein) before checkout
                      </p>
                    )}
                  </div>

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

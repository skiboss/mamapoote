"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/CartContext"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, MapPin, Clock, Heart, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_...")

interface CheckoutFormProps {
  orderTotal: number
  onPaymentSuccess: () => void
}

function CheckoutForm({ orderTotal, onPaymentSuccess }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentError, setPaymentError] = useState<string | null>(null)
  const { user } = useAuth()
  const { items, clearCart } = useCart()

  const [customerInfo, setCustomerInfo] = useState({
    email: user?.email || "",
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    deliveryInstructions: "",
  })

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setPaymentError(null)

    const cardElement = elements.getElement(CardElement)

    if (!cardElement) {
      setPaymentError("Card element not found")
      setIsProcessing(false)
      return
    }

    try {
      // Create payment intent on the server
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Math.round(orderTotal * 100), // Convert to cents
          currency: "usd",
          customerInfo,
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            customizations: item.customizations,
          })),
        }),
      })

      const { clientSecret } = await response.json()

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${customerInfo.firstName} ${customerInfo.lastName}`,
            email: customerInfo.email,
            phone: customerInfo.phone,
            address: {
              line1: customerInfo.address,
              city: customerInfo.city,
              postal_code: customerInfo.zipCode,
            },
          },
        },
      })

      if (error) {
        setPaymentError(error.message || "Payment failed")
      } else if (paymentIntent.status === "succeeded") {
        clearCart()
        onPaymentSuccess()
      }
    } catch (error) {
      setPaymentError("An unexpected error occurred")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-accent" />
            <span>Delivery Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={customerInfo.firstName}
                onChange={(e) => setCustomerInfo((prev) => ({ ...prev, firstName: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={customerInfo.lastName}
                onChange={(e) => setCustomerInfo((prev) => ({ ...prev, lastName: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Delivery Address</Label>
            <Input
              id="address"
              value={customerInfo.address}
              onChange={(e) => setCustomerInfo((prev) => ({ ...prev, address: e.target.value }))}
              placeholder="Street address"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={customerInfo.city}
                onChange={(e) => setCustomerInfo((prev) => ({ ...prev, city: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">ZIP Code</Label>
              <Input
                id="zipCode"
                value={customerInfo.zipCode}
                onChange={(e) => setCustomerInfo((prev) => ({ ...prev, zipCode: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliveryInstructions">Delivery Instructions (Optional)</Label>
            <Textarea
              id="deliveryInstructions"
              value={customerInfo.deliveryInstructions}
              onChange={(e) => setCustomerInfo((prev) => ({ ...prev, deliveryInstructions: e.target.value }))}
              placeholder="e.g., Ring doorbell, Leave at door, etc."
              className="min-h-[80px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-accent" />
            <span>Payment Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 border border-border rounded-lg">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "hsl(var(--foreground))",
                    "::placeholder": {
                      color: "hsl(var(--muted-foreground))",
                    },
                  },
                },
              }}
            />
          </div>

          {paymentError && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
              <p className="text-sm text-destructive">{paymentError}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button type="submit" size="lg" className="w-full" disabled={!stripe || isProcessing}>
        {isProcessing ? "Processing..." : `Pay $${orderTotal.toFixed(2)}`}
      </Button>
    </form>
  )
}

export default function CheckoutPage() {
  const { items, total } = useCart()
  const router = useRouter()
  const [showSuccess, setShowSuccess] = useState(false)

  const deliveryFee = 3.99
  const tax = total * 0.08
  const orderTotal = total + deliveryFee + tax

  useEffect(() => {
    if (items.length === 0 && !showSuccess) {
      router.push("/cart")
    }
  }, [items, router, showSuccess])

  const handlePaymentSuccess = () => {
    setShowSuccess(true)
    setTimeout(() => {
      router.push("/")
    }, 3000)
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Heart className="h-8 w-8 text-green-600 fill-current" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Order Confirmed!</h1>
            <p className="text-muted-foreground">
              Thank you for your order. We'll start preparing your delicious meal right away!
            </p>
            <p className="text-sm text-muted-foreground">You'll receive an email confirmation shortly.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (items.length === 0) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/cart">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
          </div>

          {/* Allergy Notice */}
          {/* <Card className="border-accent/20 bg-accent/5">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    We care about your allergies and dietary preferences
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Need to make changes to ingredients?{" "}
                    <Link href="/" className="text-accent hover:underline font-medium">
                      Customize your order here
                    </Link>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card> */}

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <Elements stripe={stripePromise}>
                <CheckoutForm orderTotal={orderTotal} onPaymentSuccess={handlePaymentSuccess} />
              </Elements>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-start space-x-3">
                        <img
                          src={`/.jpg?key=885k4&height=60&width=60&query=${encodeURIComponent(item.name + " African cuisine")}`}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 space-y-1">
                          <h4 className="font-medium text-sm text-foreground">{item.name}</h4>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>

                          {/* Customizations */}
                          {item.customizations?.removedIngredients &&
                            item.customizations.removedIngredients.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {item.customizations.removedIngredients.slice(0, 2).map((ingredient) => (
                                  <Badge key={ingredient} variant="secondary" className="text-xs">
                                    No {ingredient}
                                  </Badge>
                                ))}
                                {item.customizations.removedIngredients.length > 2 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{item.customizations.removedIngredients.length - 2} more
                                  </Badge>
                                )}
                              </div>
                            )}
                        </div>
                        <span className="font-medium text-sm text-foreground">{item.price}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Pricing Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span className="text-foreground">${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="text-foreground">${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span className="text-foreground">Total</span>
                      <span className="text-accent">${orderTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Estimated Delivery */}
                  <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-lg">
                    <Clock className="h-4 w-4 text-accent" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground">Estimated Delivery</p>
                      <p className="text-muted-foreground">45-60 minutes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

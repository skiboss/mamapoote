"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { ArrowLeft, Clock, MapPin, Star, RotateCcw } from "lucide-react"
import Link from "next/link"

// Mock order data
const mockOrders = [
  {
    id: "ORD-001",
    date: "2024-01-20",
    status: "delivered",
    total: 45.97,
    items: [
      { name: "Jollof Rice Special", quantity: 2, price: 18.99 },
      { name: "Suya Platter", quantity: 1, price: 22.99 },
    ],
    deliveryAddress: "123 Victoria Island, Lagos",
    estimatedDelivery: "45-60 minutes",
    rating: 5,
  },
  {
    id: "ORD-002",
    date: "2024-01-18",
    status: "delivered",
    total: 32.98,
    items: [
      { name: "Egusi Soup", quantity: 1, price: 19.99 },
      { name: "Plantain & Fish", quantity: 1, price: 16.99 },
    ],
    deliveryAddress: "123 Victoria Island, Lagos",
    estimatedDelivery: "45-60 minutes",
    rating: 4,
  },
  {
    id: "ORD-003",
    date: "2024-01-15",
    status: "preparing",
    total: 28.98,
    items: [
      { name: "Pepper Soup", quantity: 1, price: 15.99 },
      { name: "Vegetable Jollof", quantity: 1, price: 14.99 },
    ],
    deliveryAddress: "123 Victoria Island, Lagos",
    estimatedDelivery: "30-45 minutes",
    rating: null,
  },
]

export default function OrdersPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [filter, setFilter] = useState("all")

  if (!user) {
    router.push("/auth/signin")
    return null
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "preparing":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "on-the-way":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredOrders = filter === "all" ? mockOrders : mockOrders.filter((order) => order.status === filter)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Order History</h1>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2 overflow-x-auto">
            {[
              { key: "all", label: "All Orders" },
              { key: "delivered", label: "Delivered" },
              { key: "preparing", label: "Preparing" },
              { key: "cancelled", label: "Cancelled" },
            ].map((tab) => (
              <Button
                key={tab.key}
                variant={filter === tab.key ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(tab.key)}
                className="whitespace-nowrap"
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Orders List */}
          <div className="space-y-6">
            {filteredOrders.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                      <Clock className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">No orders found</h3>
                      <p className="text-muted-foreground">
                        {filter === "all" ? "You haven't placed any orders yet." : `No ${filter} orders found.`}
                      </p>
                    </div>
                    <Button asChild>
                      <Link href="/menu">Browse Menu</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              filteredOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="text-right space-y-2">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                        <p className="text-lg font-bold text-accent">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-3">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <img
                              src={`/ceholder-svg-key-order-.jpg?key=order-${index}&height=40&width=40&query=${encodeURIComponent(item.name + " African cuisine")}`}
                              alt={item.name}
                              className="w-10 h-10 object-cover rounded-lg"
                            />
                            <div>
                              <p className="font-medium text-foreground">{item.name}</p>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-medium text-foreground">${item.price.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Delivery Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{order.deliveryAddress}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{order.estimatedDelivery}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-4">
                        {order.rating && (
                          <div className="flex items-center space-x-1">
                            <span className="text-sm text-muted-foreground">Your rating:</span>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < order.rating! ? "fill-accent text-accent" : "text-muted"}`}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        {order.status === "delivered" && (
                          <Button variant="outline" size="sm">
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Reorder
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

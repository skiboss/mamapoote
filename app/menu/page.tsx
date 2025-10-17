"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/contexts/CartContext"
import { Search, Filter, ShoppingCart, Star, Clock, Flame } from "lucide-react"
import Link from "next/link"
import { meals, getAllCategories } from "@/lib/meals"
import { AddToCartModal } from "@/components/AddToCartModal"

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const { addItem } = useCart()

  const categories = ["all", ...getAllCategories()]

  const filteredMeals = meals.filter((meal) => {
    const matchesSearch =
      meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || meal.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddToCart = (item: any) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const getSpiceLevelText = (level: number) => {
    return ["Mild", "Medium", "Medium+", "Hot", "Very Hot"][level - 1] || "Mild"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-accent/20 to-accent/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Menu</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover authentic African flavors crafted with love and tradition. Each dish tells a story of heritage and
            culinary excellence.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search dishes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Filter by category</span>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 h-auto p-1">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="text-xs sm:text-sm py-2 px-3 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
                >
                  {category === "all" ? "All Dishes" : category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory} className="mt-8">
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredMeals.length} {filteredMeals.length === 1 ? "dish" : "dishes"}
                  {searchQuery && ` for "${searchQuery}"`}
                  {selectedCategory !== "all" && ` in ${selectedCategory}`}
                </p>
              </div>

              {/* Menu Grid */}
              {filteredMeals.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No dishes found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredMeals.map((meal) => (
                    <Card
                      key={meal.id}
                      className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-0 bg-card"
                    >
                      <Link href={`/meal/${meal.id}`}>
                        <div className="aspect-square overflow-hidden relative">
                          <img
                            src={meal.image || "/placeholder.svg"}
                            alt={meal.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                            {meal.isVegetarian && (
                              <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                Vegetarian
                              </Badge>
                            )}
                            {meal.isVegan && (
                              <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                                Vegan
                              </Badge>
                            )}
                            {meal.isGlutenFree && (
                              <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                                Gluten Free
                              </Badge>
                            )}
                          </div>
                        </div>
                      </Link>

                      <CardContent className="p-4 space-y-3">
                        <Link href={`/meal/${meal.id}`}>
                          <h3 className="font-semibold text-foreground hover:text-accent transition-colors cursor-pointer line-clamp-1">
                            {meal.name}
                          </h3>
                        </Link>

                        <p className="text-sm text-muted-foreground line-clamp-2">{meal.description}</p>

                        {/* Meal Info */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{meal.preparationTime}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Flame className="h-3 w-3" />
                              <span>{getSpiceLevelText(meal.spiceLevel)}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-accent text-accent" />
                            <span>4.8</span>
                          </div>
                        </div>

                        {/* Price and Add to Cart */}
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xl font-bold text-accent">{meal.price}</span>
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(meal)}
                            className="flex items-center space-x-2"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            <span>Add</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AddToCartModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} item={selectedItem} />
    </div>
  )
}

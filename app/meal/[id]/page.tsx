"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ChevronLeft, ShoppingCart, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/CartContext"
import { useRouter } from "next/navigation"

// Meal data with ingredients
const mealsData: Record<
  number,
  {
    id: number
    name: string
    price: string
    image: string
    description: string
    fullDescription: string
    ingredients: { id: string; name: string; category: string }[]
    allergens: string[]
  }
> = {
  1: {
    id: 1,
    name: "Jollof Rice Special",
    price: "$18.99",
    image: "/jollof-rice-with-chicken-and-vegetables.jpg",
    description: "Traditional West African rice dish with aromatic spices",
    fullDescription:
      "Our signature Jollof Rice is a celebration of West African culinary tradition. Cooked with perfectly balanced spices, fresh tomatoes, and tender chicken, this dish brings warmth and comfort to every bite. Each grain of rice is infused with the rich flavors of our secret blend of seasonings.",
    ingredients: [
      { id: "rice", name: "Long Grain Rice", category: "Base" },
      { id: "chicken", name: "Chicken Breast", category: "Protein" },
      { id: "tomato", name: "Fresh Tomatoes", category: "Vegetables" },
      { id: "onion", name: "Red Onions", category: "Vegetables" },
      { id: "pepper", name: "Bell Peppers", category: "Vegetables" },
      { id: "carrot", name: "Carrots", category: "Vegetables" },
      { id: "peas", name: "Green Peas", category: "Vegetables" },
      { id: "garlic", name: "Garlic", category: "Seasonings" },
      { id: "ginger", name: "Ginger", category: "Seasonings" },
      { id: "butter", name: "Butter", category: "Oils" },
    ],
    allergens: ["Gluten", "Dairy"],
  },
  2: {
    id: 2,
    name: "Suya Platter",
    price: "$22.99",
    image: "/suya-grilled-meat-skewers-with-spices.jpg",
    description: "Grilled spiced meat skewers with traditional seasonings",
    fullDescription:
      "Experience the authentic taste of Nigerian street food with our Suya Platter. Tender beef marinated in our special blend of peanut spices and grilled to perfection. Served with fresh onions and tomatoes for a complete sensory experience.",
    ingredients: [
      { id: "beef", name: "Beef Sirloin", category: "Protein" },
      { id: "peanut", name: "Peanut Powder", category: "Seasonings" },
      { id: "chili", name: "Chili Powder", category: "Seasonings" },
      { id: "paprika", name: "Paprika", category: "Seasonings" },
      { id: "garlic", name: "Garlic", category: "Seasonings" },
      { id: "ginger", name: "Ginger", category: "Seasonings" },
      { id: "onion", name: "Red Onions", category: "Vegetables" },
      { id: "tomato", name: "Fresh Tomatoes", category: "Vegetables" },
      { id: "lime", name: "Lime Juice", category: "Seasonings" },
    ],
    allergens: ["Peanuts", "Sesame"],
  },
  3: {
    id: 3,
    name: "Plantain & Fish",
    price: "$16.99",
    image: "/fried-plantain-with-grilled-fish-african-style.jpg",
    description: "Perfectly fried plantains with seasoned grilled fish",
    fullDescription:
      "A delightful combination of crispy golden fried plantains and perfectly grilled fish seasoned with African spices. The sweetness of the plantains complements the savory, flaky fish beautifully. A classic pairing that brings together the best of African cuisine.",
    ingredients: [
      { id: "plantain", name: "Green Plantains", category: "Base" },
      { id: "fish", name: "Fresh Tilapia", category: "Protein" },
      { id: "lemon", name: "Lemon", category: "Seasonings" },
      { id: "garlic", name: "Garlic", category: "Seasonings" },
      { id: "thyme", name: "Thyme", category: "Seasonings" },
      { id: "paprika", name: "Paprika", category: "Seasonings" },
      { id: "oil", name: "Vegetable Oil", category: "Oils" },
      { id: "salt", name: "Sea Salt", category: "Seasonings" },
      { id: "pepper", name: "Black Pepper", category: "Seasonings" },
    ],
    allergens: ["Fish", "Shellfish"],
  },
  4: {
    id: 4,
    name: "Egusi Soup",
    price: "$19.99",
    image: "/egusi-soup-with-meat-and-vegetables.jpg",
    description: "Rich melon seed soup with assorted meat and vegetables",
    fullDescription:
      "Egusi Soup is a beloved West African delicacy made with ground melon seeds, creating a rich and creamy broth. Loaded with tender meat, fresh vegetables, and aromatic spices, this soup is comfort in a bowl. Perfect for those seeking authentic African flavors.",
    ingredients: [
      { id: "egusi", name: "Ground Egusi Seeds", category: "Base" },
      { id: "beef", name: "Beef Chunks", category: "Protein" },
      { id: "spinach", name: "Fresh Spinach", category: "Vegetables" },
      { id: "tomato", name: "Tomato Paste", category: "Vegetables" },
      { id: "onion", name: "Onions", category: "Vegetables" },
      { id: "garlic", name: "Garlic", category: "Seasonings" },
      { id: "ginger", name: "Ginger", category: "Seasonings" },
      { id: "palm", name: "Palm Oil", category: "Oils" },
      { id: "stock", name: "Beef Stock", category: "Seasonings" },
    ],
    allergens: ["Sesame", "Tree Nuts"],
  },
}

export default function MealDetailPage({ params }: { params: { id: string } }) {
  const mealId = Number.parseInt(params.id)
  const meal = mealsData[mealId]
  const router = useRouter()
  const { addItem } = useCart()

  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(
    new Set(meal.ingredients.map((ing) => ing.id)),
  )
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [quantity, setQuantity] = useState(1)

  if (!meal) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Meal not found</h1>
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleToggleIngredient = (ingredientId: string) => {
    const newSelected = new Set(selectedIngredients)
    if (newSelected.has(ingredientId)) {
      newSelected.delete(ingredientId)
    } else {
      newSelected.add(ingredientId)
    }
    setSelectedIngredients(newSelected)
  }

  const handleAddToCart = () => {
    const removedIngredients = meal.ingredients.filter((ing) => !selectedIngredients.has(ing.id)).map((ing) => ing.name)

    addItem({
      id: meal.id.toString(),
      name: meal.name,
      price: meal.price.replace("$", ""),
      image: meal.image,
      description: meal.description,
    //   quantity,
      customizations: {
        removedIngredients,
        specialInstructions,
      },
    })

    router.push("/cart")
  }

  // Group ingredients by category
  const ingredientsByCategory = meal.ingredients.reduce(
    (acc, ing) => {
      if (!acc[ing.category]) {
        acc[ing.category] = []
      }
      acc[ing.category].push(ing)
      return acc
    },
    {} as Record<string, typeof meal.ingredients>,
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-orange-500 ml-4">Mamapoote</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Meal Image and Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img src={meal.image || "/placeholder.svg"} alt={meal.name} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{meal.name}</h1>
              <p className="text-2xl font-bold text-orange-500 mb-4">{meal.price}</p>
              <p className="text-gray-700 text-lg leading-relaxed">{meal.fullDescription}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3"
                >
                  -
                </Button>
                <span className="px-4 font-semibold">{quantity}</span>
                <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)} className="px-3">
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Customization Section */}
        <div className="space-y-8">
          {/* Important Notice */}
          <Alert className="border-orange-200 bg-orange-50">
            <AlertCircle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>Important Notice:</strong> Please inform us of any allergies or dietary restrictions. While we
              take every precaution, our kitchen handles various ingredients and cross-contamination may occur. If you
              have severe allergies, please call directly at +234 123 456 7890.
            </AlertDescription>
          </Alert>

          {/* Ingredients Customization */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Customize Your Ingredients</CardTitle>
              <p className="text-sm text-gray-600 mt-2">Uncheck any ingredients you'd like to remove from your meal</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(ingredientsByCategory).map(([category, ingredients]) => (
                  <div key={category}>
                    <h3 className="font-semibold text-gray-900 mb-3">{category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {ingredients.map((ingredient) => (
                        <div key={ingredient.id} className="flex items-center space-x-3">
                          <Checkbox
                            id={ingredient.id}
                            checked={selectedIngredients.has(ingredient.id)}
                            onCheckedChange={() => handleToggleIngredient(ingredient.id)}
                          />
                          <label
                            htmlFor={ingredient.id}
                            className="text-sm font-medium text-gray-700 cursor-pointer flex-1"
                          >
                            {ingredient.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Special Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Special Instructions</CardTitle>
              <p className="text-sm text-gray-600 mt-2">Any additional requests or modifications for your order</p>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="e.g., Extra spicy, no onions, cook well done, etc."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="min-h-32 resize-none"
              />
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button variant="outline" size="lg" asChild className="flex-1 bg-transparent">
              <Link href="/">Continue Shopping</Link>
            </Button>
            <Button size="lg" onClick={handleAddToCart} className="flex-1 flex items-center justify-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

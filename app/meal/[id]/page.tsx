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
import { SoupCustomizationModal } from "@/components/SoupCustomizationModal"

// Meal data with ingredients
const mealsData: Record<
  number,
  {
    id: number
    name: string
    price: number
    image: string
    description: string
    fullDescription: string
    ingredients: string[]
    proteins: { id: string; name: string; price: number }[]
    sideAttractions: { id: string; name: string; price: number }[]
    allergens: string[]
  }
> = {
  1: {
    id: 1,
    name: "Jollof Rice Special",
    price: 18.99,
    image: "/jollof-rice-with-chicken-and-vegetables.jpg",
    description: "Traditional West African rice dish with aromatic spices",
    fullDescription:
      "Our signature Jollof Rice is a celebration of West African culinary tradition. Cooked with perfectly balanced spices, fresh tomatoes, and tender chicken, this dish brings warmth and comfort to every bite. Each grain of rice is infused with the rich flavors of our secret blend of seasonings.",
    ingredients: [
      "Long Grain Rice",
      "Fresh Tomatoes",
      "Red Onions",
      "Bell Peppers",
      "Carrots",
      "Green Peas",
      "Garlic",
      "Ginger",
      "Butter",
    ],
    proteins: [
      { id: "chicken", name: "Grilled Chicken Breast", price: 3.99 },
      { id: "beef", name: "Tender Beef", price: 5.99 },
      { id: "shrimp", name: "Jumbo Shrimp", price: 7.99 },
      { id: "turkey", name: "Smoked Turkey", price: 4.99 },
    ],
    sideAttractions: [
      { id: "plantain", name: "Fried Plantain (1 portion)", price: 2.99 },
      { id: "salad", name: "Fresh Garden Salad (1 portion)", price: 2.49 },
      { id: "coleslaw", name: "Crunchy Coleslaw (1 portion)", price: 1.99 },
      { id: "beans", name: "Black Beans (1 portion)", price: 1.99 },
    ],
    allergens: ["Gluten", "Dairy"],
  },
  2: {
    id: 2,
    name: "Suya Platter",
    price: 22.99,
    image: "/suya-grilled-meat-skewers-with-spices.jpg",
    description: "Grilled spiced meat skewers with traditional seasonings",
    fullDescription:
      "Experience the authentic taste of Nigerian street food with our Suya Platter. Tender beef marinated in our special blend of peanut spices and grilled to perfection. Served with fresh onions and tomatoes for a complete sensory experience.",
    ingredients: [
      "Beef Sirloin",
      "Peanut Powder",
      "Chili Powder",
      "Paprika",
      "Garlic",
      "Ginger",
      "Red Onions",
      "Fresh Tomatoes",
      "Lime Juice",
    ],
    proteins: [
      { id: "beef", name: "Beef Sirloin Skewers", price: 4.99 },
      { id: "chicken", name: "Spiced Chicken Skewers", price: 3.99 },
      { id: "lamb", name: "Lamb Skewers", price: 6.99 },
    ],
    sideAttractions: [
      { id: "rice", name: "White Rice (1 portion)", price: 1.99 },
      { id: "attiieke", name: "Attiéké (1 portion)", price: 2.49 },
      { id: "veggie", name: "Grilled Vegetables (1 portion)", price: 2.99 },
    ],
    allergens: ["Peanuts", "Sesame"],
  },
  3: {
    id: 3,
    name: "Plantain & Fish",
    price: 16.99,
    image: "/fried-plantain-with-grilled-fish-african-style.jpg",
    description: "Perfectly fried plantains with seasoned grilled fish",
    fullDescription:
      "A delightful combination of crispy golden fried plantains and perfectly grilled fish seasoned with African spices. The sweetness of the plantains complements the savory, flaky fish beautifully. A classic pairing that brings together the best of African cuisine.",
    ingredients: [
      "Green Plantains",
      "Fresh Tilapia",
      "Lemon",
      "Garlic",
      "Thyme",
      "Paprika",
      "Vegetable Oil",
      "Sea Salt",
      "Black Pepper",
    ],
    proteins: [
      { id: "tilapia", name: "Grilled Tilapia Fillet", price: 4.99 },
      { id: "catfish", name: "Catfish Fillet", price: 5.49 },
      { id: "snapper", name: "Red Snapper", price: 6.99 },
    ],
    sideAttractions: [
      { id: "salad", name: "Fresh Garden Salad (1 portion)", price: 2.49 },
      { id: "rice", name: "Jollof Rice (1 portion)", price: 2.99 },
      { id: "veggies", name: "Steamed Vegetables (1 portion)", price: 2.49 },
    ],
    allergens: ["Fish", "Shellfish"],
  },
  4: {
    id: 4,
    name: "Egusi Soup",
    price: 19.99,
    image: "/egusi-soup-with-meat-and-vegetables.jpg",
    description: "Rich melon seed soup with assorted meat and vegetables",
    fullDescription:
      "Egusi Soup is a beloved West African delicacy made with ground melon seeds, creating a rich and creamy broth. Loaded with tender meat, fresh vegetables, and aromatic spices, this soup is comfort in a bowl. Perfect for those seeking authentic African flavors.",
    ingredients: [
      "Ground Egusi Seeds",
      "Beef Chunks",
      "Fresh Spinach",
      "Tomato Paste",
      "Onions",
      "Garlic",
      "Ginger",
      "Palm Oil",
      "Beef Stock",
    ],
    proteins: [
      { id: "beef", name: "Tender Beef Chunks", price: 3.99 },
      { id: "chicken", name: "Chicken Pieces", price: 3.49 },
      { id: "mixed", name: "Mixed Meat", price: 5.99 },
    ],
    sideAttractions: [
      { id: "fufu", name: "Cassava Fufu (1 portion)", price: 2.99 },
      { id: "pounded", name: "Pounded Yam (1 portion)", price: 3.49 },
      { id: "bread", name: "Garlic Bread (3 pieces)", price: 2.49 },
    ],
    allergens: ["Sesame", "Tree Nuts"],
  },
}

export default function MealDetailPage({ params }: { params: { id: string } }) {
  const mealId = Number.parseInt(params.id)
  const meal = mealsData[mealId]
  const router = useRouter()
  const { addItem } = useCart()

  // const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(
  //   new Set(meal.ingredients.map((ing) => ing.id)),
  // )

  // const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(new Set())
  const [selectedProtein, setSelectedProtein] = useState<string | null>(null)
  const [selectedSides, setSelectedSides] = useState<Set<string>>(new Set())
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isSoupModalOpen, setIsSoupModalOpen] = useState(false)
  const [pendingCartItem, setPendingCartItem] = useState<any>(null)

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

    const calculateMealTotal = () => {
    let total = meal.price
    if (selectedProtein) {
      const protein = meal.proteins.find((p) => p.id === selectedProtein)
      if (protein) total += protein.price
    }
    selectedSides.forEach((sideId) => {
      const side = meal.sideAttractions.find((s) => s.id === sideId)
      if (side) total += side.price
    })
    return total
  }

  const mealTotal = calculateMealTotal()

  const handleToggleSide = (sideId: string) => {
    const newSides = new Set(selectedSides)
    if (newSides.has(sideId)) {
      newSides.delete(sideId)
    } else {
      newSides.add(sideId)
    }
    setSelectedSides(newSides)
  }

  const isSoup = meal.name.toLowerCase().includes("soup")

  const handleAddToCart = () => {
    // Build the cart item with selected customizations
    const cartItem = {
      id: `${meal.id}-${Date.now()}`,
      name: meal.name,
      price: `$${mealTotal.toFixed(2)}`,
      image: meal.image,
      quantity,
      customizations: {
        removedIngredients: [],
        specialInstructions,
        selectedProtein: selectedProtein
          ? meal.proteins.find((p) => p.id === selectedProtein)?.name || "None"
          : "None",
        selectedSides: Array.from(selectedSides)
          .map((id) => meal.sideAttractions.find((s) => s.id === id)?.name)
          .filter((name): name is string => Boolean(name)),
        basePrice: meal.price,
        proteinPrice:
          (selectedProtein
            ? meal.proteins.find((p) => p.id === selectedProtein)?.price
            : 0) || 0,
        sidesPrice: Array.from(selectedSides).reduce((sum, sideId) => {
          const side = meal.sideAttractions.find((s) => s.id === sideId)
          return sum + (side?.price || 0)
        }, 0),
      },
    }

    // If this is a soup, open the soup customization modal; otherwise add to cart and navigate.
    if (isSoup) {
      setPendingCartItem(cartItem)
      setIsSoupModalOpen(true)
    } else {
      addItem(cartItem)
      router.push("/cart")
    }
  }

  // const handleSoupCustomizationComplete = () => {
  //   if (pendingCartItem) {
  //     addItem(pendingCartItem)
  //     setIsSoupModalOpen(false)
  //     setPendingCartItem(null)
  //     router.push("/cart")
  //   }
  // }

  // Group ingredients by category (commented out - enable and adapt if you add categories)
  // const ingredientsByCategory = meal.ingredients.reduce(
  //   (acc, ing) => {
  //     if (!acc[ing.category]) {
  //       acc[ing.category] = []
  //     }
  //     acc[ing.category].push(ing)
  //     return acc
  //   },
  //   {} as Record<string, typeof meal.ingredients>
  // )

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
            <h1 className="text-2xl font-bold text-orange-600 ml-4">Mamapoote</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Meal Image and Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="aspect-square overflow-hidden rounded-lg shadow-lg">
              <img src={meal.image || "/placeholder.svg"} alt={meal.name} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{meal.name}</h1>
<p className="text-3xl font-bold text-orange-600 mb-4">${meal.price.toFixed(2)}</p>              <p className="text-gray-700 text-lg leading-relaxed">{meal.fullDescription}</p>
              {isSoup && (
                <Alert className="mt-4 border-blue-200 bg-blue-50">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    This is a soup. You'll need to select a protein and optionally choose a swallow (semo, eba, or
                    fufu).
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* <div className="flex items-center space-x-4">
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
            </div> */}
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

          {/* Recipe/Ingredients Display */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Recipe</CardTitle>
              <p className="text-sm text-gray-600 mt-2">This dish contains the following ingredients</p>
            </CardHeader>
            <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       {meal.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="text-orange-600 font-bold mt-1">•</span>
                    <span className="text-gray-700">{ingredient}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Protein Selection */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Choose Your Protein</CardTitle>
              <p className="text-sm text-gray-600 mt-2">Select your preferred protein to add to this meal</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {meal.proteins.map((protein) => (
                  <div
                    key={protein.id}
                    onClick={() => setSelectedProtein(protein.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedProtein === protein.id
                        ? "border-orange-600 bg-orange-50"
                        : "border-gray-200 bg-white hover:border-orange-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            selectedProtein === protein.id ? "border-orange-600 bg-orange-600" : "border-gray-300"
                          }`}
                        >
                          {selectedProtein === protein.id && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <span className="font-medium text-gray-900">{protein.name}</span>
                      </div>
                      <span className="font-bold text-orange-600">+${protein.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Side Attractions */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Side Attractions</CardTitle>
              <p className="text-sm text-gray-600 mt-2">Add sides to complement your meal (you can select multiple)</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {meal.sideAttractions.map((side) => (
                  <div
                    key={side.id}
                    onClick={() => handleToggleSide(side.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedSides.has(side.id)
                        ? "border-orange-600 bg-orange-50"
                        : "border-gray-200 bg-white hover:border-orange-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                            selectedSides.has(side.id) ? "border-orange-600 bg-orange-600" : "border-gray-300"
                          }`}
                        >
                          {selectedSides.has(side.id) && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <span className="font-medium text-gray-900">{side.name}</span>
                      </div>
                      <span className="font-bold text-orange-600">+${side.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Special Instructions */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900">Special Instructions</CardTitle>
              <p className="text-sm text-gray-600 mt-2">Mention any allergies, preferences, or special requests</p>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="e.g., I'm allergic to peanuts, extra spicy, no onions, gluten-free, etc."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="min-h-32 resize-none"
              />
            </CardContent>
          </Card>

          
          {/* Price Summary */}
          <Card className="border-2 border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-gray-700">
                  <span>Base Meal:</span>
                  <span>${meal.price.toFixed(2)}</span>
                </div>
                {selectedProtein && (
                  <div className="flex justify-between items-center text-gray-700">
                    <span>Protein:</span>
                    <span>+${meal.proteins.find((p) => p.id === selectedProtein)?.price.toFixed(2)}</span>
                  </div>
                )}
                {selectedSides.size > 0 && (
                  <div className="flex justify-between items-center text-gray-700">
                    <span>Sides ({selectedSides.size}):</span>
                    <span>
                      +$
                      {Array.from(selectedSides)
                        .reduce((sum, sideId) => {
                          const side = meal.sideAttractions.find((s) => s.id === sideId)
                          return sum + (side?.price || 0)
                        }, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="border-t-2 border-orange-200 pt-3 flex justify-between items-center text-2xl font-bold text-orange-600">
                  <span>Total per Item:</span>
                  <span>${mealTotal.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex">
            {/* <Button variant="outline" size="lg" asChild className="flex-1 bg-transparent">
              <Link href="/">Continue Shopping</Link>
            </Button> */}
<Button
              size="lg"
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700"
            >              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart - ${(mealTotal * quantity).toFixed(2)}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* {pendingCartItem && (
        <SoupCustomizationModal
          isOpen={isSoupModalOpen}
          onClose={() => {
            setIsSoupModalOpen(false)
            setPendingCartItem(null)
          }}
          itemId={pendingCartItem.id}
          itemName={pendingCartItem.name}
          onCustomizationComplete={handleSoupCustomizationComplete}
        />
      )} */}
    </div>
  )
}

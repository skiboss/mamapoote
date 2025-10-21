// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Badge } from "@/components/ui/badge"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"
// import { useCart } from "@/contexts/CartContext"
// import { useRouter } from "next/navigation"
// import { ArrowLeft, AlertTriangle, Save, RotateCcw } from "lucide-react"
// import Link from "next/link"
// import { useToast } from "@/hooks/use-toast"

// const commonAllergens = ["Peanuts", "Tree nuts", "Fish", "Shellfish", "Eggs", "Dairy", "Soy", "Wheat/Gluten"]

// const dietaryPreferences = [
//   { id: "vegetarian", label: "Vegetarian", description: "No meat or fish" },
//   { id: "vegan", label: "Vegan", description: "No animal products" },
//   { id: "halal", label: "Halal", description: "Islamic dietary requirements" },
//   { id: "kosher", label: "Kosher", description: "Jewish dietary requirements" },
//   { id: "low-sodium", label: "Low Sodium", description: "Reduced salt content" },
//   { id: "dairy-free", label: "Dairy Free", description: "No dairy products" },
// ]

// export default function CustomizeIngredientsPage() {
//   const { items, updateCartItemCustomizations } = useCart()
//   const router = useRouter()
//   const { toast } = useToast()

//   const [selectedAllergens, setSelectedAllergens] = useState<string[]>([])
//   const [selectedDietary, setSelectedDietary] = useState<string[]>([])
//   const [specialInstructions, setSpecialInstructions] = useState("")
//   const [isLoading, setIsLoading] = useState(false)

//   const handleAllergenToggle = (allergen: string) => {
//     setSelectedAllergens((prev) => (prev.includes(allergen) ? prev.filter((a) => a !== allergen) : [...prev, allergen]))
//   }

//   const handleDietaryToggle = (dietary: string) => {
//     setSelectedDietary((prev) => (prev.includes(dietary) ? prev.filter((d) => d !== dietary) : [...prev, dietary]))
//   }

//   const handleSaveCustomizations = async () => {
//     setIsLoading(true)

//     try {
//       // Apply customizations to all cart items
//       items.forEach((item) => {
//         const customizations = {
//           allergenRestrictions: selectedAllergens,
//           dietaryPreferences: selectedDietary,
//           specialInstructions: specialInstructions,
//           removedIngredients: [], // This would be populated based on allergens/preferences
//         }

//         updateCartItemCustomizations(item.id, customizations)
//       })

//       toast({
//         title: "Customizations saved!",
//         description: "Your dietary preferences have been applied to all items in your cart.",
//       })

//       // Redirect back to cart or checkout
//       router.push("/cart")
//     } catch (error) {
//       toast({
//         title: "Failed to save customizations",
//         description: "Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleReset = () => {
//     setSelectedAllergens([])
//     setSelectedDietary([])
//     setSpecialInstructions("")
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="max-w-4xl mx-auto px-4 py-8">
//         <div className="space-y-8">
//           {/* Header */}
//           <div className="flex items-center space-x-4">
//             <Button variant="ghost" size="icon" asChild>
//               <Link href="/cart">
//                 <ArrowLeft className="h-5 w-5" />
//               </Link>
//             </Button>
//             <div>
//               <h1 className="text-3xl font-bold text-foreground">Customize Your Order</h1>
//               <p className="text-muted-foreground">Let us know about your dietary preferences and allergies</p>
//             </div>
//           </div>

//           {/* Important Notice */}
//           <Card className="border-accent/20 bg-accent/5">
//             <CardContent className="p-6">
//               <div className="flex items-start space-x-3">
//                 <AlertTriangle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
//                 <div className="space-y-2">
//                   <h3 className="font-semibold text-foreground">Important Notice</h3>
//                   <p className="text-sm text-muted-foreground">
//                     Please inform us of any allergies or dietary restrictions. While we take every precaution, our
//                     kitchen handles various ingredients and cross-contamination may occur. If you have severe allergies,
//                     please call us directly at +234 123 456 7890.
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <div className="grid gap-8 lg:grid-cols-2">
//             {/* Allergen Restrictions */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center space-x-2">
//                   <AlertTriangle className="h-5 w-5 text-destructive" />
//                   <span>Allergen Restrictions</span>
//                 </CardTitle>
//                 <p className="text-sm text-muted-foreground">Select any allergens you need to avoid</p>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-2 gap-3">
//                   {commonAllergens.map((allergen) => (
//                     <div key={allergen} className="flex items-center space-x-2">
//                       <Checkbox
//                         id={`allergen-${allergen}`}
//                         checked={selectedAllergens.includes(allergen)}
//                         onCheckedChange={() => handleAllergenToggle(allergen)}
//                       />
//                       <Label htmlFor={`allergen-${allergen}`} className="text-sm font-medium cursor-pointer">
//                         {allergen}
//                       </Label>
//                     </div>
//                   ))}
//                 </div>

//                 {selectedAllergens.length > 0 && (
//                   <div className="pt-3 border-t">
//                     <p className="text-sm font-medium text-foreground mb-2">Selected allergens to avoid:</p>
//                     <div className="flex flex-wrap gap-2">
//                       {selectedAllergens.map((allergen) => (
//                         <Badge key={allergen} variant="destructive" className="text-xs">
//                           {allergen}
//                         </Badge>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>

//             {/* Dietary Preferences */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Dietary Preferences</CardTitle>
//                 <p className="text-sm text-muted-foreground">Select your dietary preferences</p>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-3">
//                   {dietaryPreferences.map((preference) => (
//                     <div key={preference.id} className="flex items-start space-x-3">
//                       <Checkbox
//                         id={`dietary-${preference.id}`}
//                         checked={selectedDietary.includes(preference.id)}
//                         onCheckedChange={() => handleDietaryToggle(preference.id)}
//                         className="mt-1"
//                       />
//                       <div className="flex-1">
//                         <Label htmlFor={`dietary-${preference.id}`} className="text-sm font-medium cursor-pointer">
//                           {preference.label}
//                         </Label>
//                         <p className="text-xs text-muted-foreground">{preference.description}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {selectedDietary.length > 0 && (
//                   <div className="pt-3 border-t">
//                     <p className="text-sm font-medium text-foreground mb-2">Selected preferences:</p>
//                     <div className="flex flex-wrap gap-2">
//                       {selectedDietary.map((dietary) => {
//                         const pref = dietaryPreferences.find((p) => p.id === dietary)
//                         return (
//                           <Badge key={dietary} variant="secondary" className="text-xs">
//                             {pref?.label}
//                           </Badge>
//                         )
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>

//           {/* Special Instructions */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Special Instructions</CardTitle>
//               <p className="text-sm text-muted-foreground">Any additional requests or modifications for your order</p>
//             </CardHeader>
//             <CardContent>
//               <Textarea
//                 value={specialInstructions}
//                 onChange={(e) => setSpecialInstructions(e.target.value)}
//                 placeholder="e.g., Extra spicy, no onions, cook well done, etc."
//                 className="min-h-[100px]"
//               />
//             </CardContent>
//           </Card>

//           {/* Cart Items Preview */}
//           {items.length > 0 && (
//             <Card>
//               <CardHeader>
//                 <CardTitle>Items in Your Cart</CardTitle>
//                 <p className="text-sm text-muted-foreground">These customizations will be applied to all items below</p>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-3">
//                   {items.map((item) => (
//                     <div key={item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
//                       <div className="flex items-center space-x-3">
//                         <img
//                           src={`/ceholder-svg-key-cart-.jpg?key=cart-${item.id}&height=40&width=40&query=${encodeURIComponent(item.name + " African cuisine")}`}
//                           alt={item.name}
//                           className="w-10 h-10 object-cover rounded-lg"
//                         />
//                         <div>
//                           <p className="font-medium text-foreground">{item.name}</p>
//                           <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
//                         </div>
//                       </div>
//                       <span className="font-medium text-foreground">{item.price}</span>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-between">
//             <Button variant="outline" onClick={handleReset} className="flex items-center space-x-2 bg-transparent">
//               <RotateCcw className="h-4 w-4" />
//               <span>Reset All</span>
//             </Button>

//             <div className="flex flex-col sm:flex-row gap-3">
//               <Button variant="outline" asChild>
//                 <Link href="/cart">Back to Cart</Link>
//               </Button>
//               <Button onClick={handleSaveCustomizations} disabled={isLoading} className="flex items-center space-x-2">
//                 <Save className="h-4 w-4" />
//                 <span>{isLoading ? "Saving..." : "Save & Continue"}</span>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

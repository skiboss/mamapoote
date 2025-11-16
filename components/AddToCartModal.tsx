"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { useCart } from "@/contexts/CartContext"

interface AddToCartModalProps {
  isOpen: boolean
  onClose: () => void
  item: {
    id: number
    name: string
    price: string
    image: string
    description: string
  } | null
}

export function AddToCartModal({ isOpen, onClose, item }: AddToCartModalProps) {
  const router = useRouter()
  const { addItem } = useCart()

  if (!item) return null

  const handleCustomize = () => {
    onClose()
    // router.push(`/meal/${meal.id}`)
    router.push('/meal/' + item.id)
  }

  const handleAddDirectly = () => {
    addItem({
      id: item.id.toString(),
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description,
    })
    onClose()
    router.push("/cart")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">Customize Your Order</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
            <div className="flex-1 space-y-1">
              <h3 className="font-semibold text-base">{item.name}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
              <p className="text-orange-500 font-bold text-lg">{item.price}</p>
            </div>
          </div>

          <p className="text-gray-700 text-center py-2">
            Would you like to remove any ingredients due to preference or allergy?
          </p>
        </div>

        <DialogFooter className="flex-col space-y-3 sm:space-y-3 sm:flex-col">
          <Button size="lg" className="w-full" onClick={handleCustomize}>
            Yes, Customize Ingredients
          </Button>
          <Button variant="outline" size="lg" className="w-full bg-transparent" onClick={handleAddDirectly}>
            No, Add to Cart as is
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

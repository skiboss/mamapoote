"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useCart } from "@/contexts/CartContext"
import { Minus, Plus } from "lucide-react"

interface SoupCustomizationModalProps {
  isOpen: boolean
  onClose: () => void
  itemId: string
  itemName: string
  onCustomizationComplete?: () => void
}

const PROTEINS = [
  { id: "beef", label: "Beef" },
  { id: "chicken", label: "Chicken" },
  { id: "goat", label: "Goat Meat" },
  { id: "fish", label: "Fish" },
  { id: "shrimp", label: "Shrimp" },
  { id: "mixed", label: "Mixed Meat" },
]

const SWALLOWS = [
  { id: "semo", label: "Semo" },
  { id: "eba", label: "Eba" },
  { id: "fufu", label: "Fufu" },
]

export function SoupCustomizationModal({
  isOpen,
  onClose,
  itemId,
  itemName,
  onCustomizationComplete,
}: SoupCustomizationModalProps) {
  const { updateSoupCustomizations } = useCart()
  const [selectedProtein, setSelectedProtein] = useState<string>("")
  const [proteinQuantity, setProteinQuantity] = useState<number>(1)
  const [selectedSwallow, setSelectedSwallow] = useState<string>("")
  const [swallowQuantity, setSwallowQuantity] = useState<number>(1)

  const handleSave = () => {
    if (!selectedProtein) {
      alert("Please select a protein")
      return
    }

    updateSoupCustomizations?.(itemId, {
      selectedProtein,
      proteinQuantity,
      selectedSwallow: selectedSwallow || undefined,
      swallowQuantity: selectedSwallow ? swallowQuantity : undefined,
    })

    onCustomizationComplete?.()
    onClose()
  }

  const handleQuantityChange = (current: number, delta: number) => {
    const newValue = current + delta
    return newValue > 0 ? newValue : 1
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Customize {itemName}</DialogTitle>
          <DialogDescription>Select your preferred protein and swallow (optional) with quantities</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Protein Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-foreground">
              Select Protein <span className="text-destructive">*</span>
            </Label>
            <RadioGroup value={selectedProtein} onValueChange={setSelectedProtein}>
              <div className="space-y-2">
                {PROTEINS.map((protein) => (
                  <div key={protein.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={protein.id} id={`protein-${protein.id}`} />
                    <Label htmlFor={`protein-${protein.id}`} className="font-normal cursor-pointer">
                      {protein.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            {selectedProtein && (
              <div className="mt-3 p-3 bg-accent/10 rounded-lg space-y-2">
                <Label className="text-sm font-medium text-foreground">Protein Quantity</Label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setProteinQuantity(handleQuantityChange(proteinQuantity, -1))}
                    className="h-8 w-8"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    value={proteinQuantity}
                    onChange={(e) => {
                      const val = Number.parseInt(e.target.value) || 1
                      setProteinQuantity(val > 0 ? val : 1)
                    }}
                    className="w-16 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setProteinQuantity(handleQuantityChange(proteinQuantity, 1))}
                    className="h-8 w-8"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Swallow Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold text-foreground">
              Select Swallow <span className="text-muted-foreground text-sm">(Optional)</span>
            </Label>
            <RadioGroup value={selectedSwallow} onValueChange={setSelectedSwallow}>
              <div className="space-y-2">
                {SWALLOWS.map((swallow) => (
                  <div key={swallow.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={swallow.id} id={`swallow-${swallow.id}`} />
                    <Label htmlFor={`swallow-${swallow.id}`} className="font-normal cursor-pointer">
                      {swallow.label}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            {selectedSwallow && (
              <div className="mt-3 p-3 bg-accent/10 rounded-lg space-y-2">
                <Label className="text-sm font-medium text-foreground">Swallow Quantity</Label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSwallowQuantity(handleQuantityChange(swallowQuantity, -1))}
                    className="h-8 w-8"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    value={swallowQuantity}
                    onChange={(e) => {
                      const val = Number.parseInt(e.target.value) || 1
                      setSwallowQuantity(val > 0 ? val : 1)
                    }}
                    className="w-16 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSwallowQuantity(handleQuantityChange(swallowQuantity, 1))}
                    className="h-8 w-8"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
            <Button onClick={handleSave} className="flex-1">
              Save Customization
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { AlertTriangle } from "lucide-react"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const router = useRouter()

  const handleCustomizeIngredients = () => {
    onClose()
    router.push("/customize-ingredients")
  }

  const handleProceedDirectly = () => {
    onClose()
    router.push("/checkout")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-lg font-semibold">
            <AlertTriangle className="h-5 w-5 text-accent" />
            <span>Allergy & Preference Check</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-foreground text-center leading-relaxed">
            Before we proceed with your order, would you like to remove any ingredients due to allergies or dietary
            preferences?
          </p>

          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              We care about your health and want to ensure your meal is perfect for you.
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col space-y-3 sm:space-y-3 sm:flex-col">
          <Button size="lg" className="w-full" onClick={handleCustomizeIngredients}>
            Yes, I'd like to customize ingredients
          </Button>
          <Button variant="outline" size="lg" className="w-full bg-transparent" onClick={handleProceedDirectly}>
            No, proceed with current order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

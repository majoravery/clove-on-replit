import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Crown } from "lucide-react";

interface PremiumModalProps {
  open: boolean;
  onClose: () => void;
  feature?: "drag" | "pastPlans";
}

export default function PremiumModal({ open, onClose, feature = "drag" }: PremiumModalProps) {
  const handleUpgrade = () => {
    // TODO: Implement upgrade flow
    console.log("Redirecting to upgrade page...");
    onClose();
  };

  const getFeatureDescription = () => {
    switch (feature) {
      case "pastPlans":
        return "View past meal plans is available with Clove Premium. Upgrade to access your meal planning history and more!";
      case "drag":
      default:
        return "Meal rearrangement is available with Clove Premium. Upgrade to unlock this feature and more!";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="text-white h-8 w-8" />
          </div>
          <DialogTitle className="text-xl">Premium Feature</DialogTitle>
          <DialogDescription className="text-gray-600">
            {getFeatureDescription()}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex space-x-3 sm:space-x-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleUpgrade} className="flex-1 bg-secondary hover:bg-secondary/90">
            Upgrade Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

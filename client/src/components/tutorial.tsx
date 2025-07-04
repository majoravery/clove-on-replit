import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface TutorialProps {
  open: boolean;
  onComplete: () => void;
}

const tutorialSteps = [
  {
    title: "Welcome to Clove!",
    content: "Let's take a quick tour of your meal planning dashboard. This tutorial will show you the key features to help you reduce food waste and plan better meals.",
    target: null,
    position: "center"
  },
  {
    title: "Next Up To Do",
    content: "This section shows important tasks like meal prep activities and shopping reminders. Check off items as you complete them to stay organized.",
    target: "tasks",
    position: "bottom"
  },
  {
    title: "Weekly Meal Plan",
    content: "This is your 7-day meal planning grid. Here you'll see your planned meals for each day, organized by breakfast, lunch, and dinner. You can drag meals between days to reorganize your week.",
    target: "meal-plan",
    position: "top"
  },
  {
    title: "Your Inventory",
    content: "The sidebar shows your current food inventory. Items running low will be highlighted so you know what to buy. This helps prevent food waste and ensures you always have what you need.",
    target: "sidebar",
    position: "left"
  }
];

export default function Tutorial({ open, onComplete }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightRect, setHighlightRect] = useState<DOMRect | null>(null);
  
  const currentTutorialStep = tutorialSteps[currentStep];

  // Update highlight when step changes
  useEffect(() => {
    if (open && currentTutorialStep.target) {
      const element = document.querySelector(`[data-tutorial="${currentTutorialStep.target}"]`);
      if (element) {
        const rect = element.getBoundingClientRect();
        setHighlightRect(rect);
      }
    } else {
      setHighlightRect(null);
    }
  }, [open, currentStep, currentTutorialStep.target]);

  if (!open) return null;

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const getPopupPosition = () => {
    if (!highlightRect || !currentTutorialStep.target) {
      return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }

    const padding = 20;
    const popupWidth = 400;
    const popupHeight = 200;

    switch (currentTutorialStep.position) {
      case 'top':
        return {
          top: highlightRect.top - popupHeight - padding,
          left: highlightRect.left + (highlightRect.width / 2) - (popupWidth / 2),
          transform: 'none'
        };
      case 'bottom':
        return {
          top: highlightRect.bottom + padding,
          left: highlightRect.left + (highlightRect.width / 2) - (popupWidth / 2),
          transform: 'none'
        };
      case 'left':
        return {
          top: highlightRect.top + (highlightRect.height / 2) - (popupHeight / 2),
          left: highlightRect.left - popupWidth - padding,
          transform: 'none'
        };
      case 'right':
        return {
          top: highlightRect.top + (highlightRect.height / 2) - (popupHeight / 2),
          left: highlightRect.right + padding,
          transform: 'none'
        };
      default:
        return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop with cutout */}
      <div className="absolute inset-0">
        {highlightRect ? (
          <svg className="w-full h-full">
            <defs>
              <mask id="cutout">
                <rect width="100%" height="100%" fill="white" />
                <rect
                  x={highlightRect.left - 4}
                  y={highlightRect.top - 4}
                  width={highlightRect.width + 8}
                  height={highlightRect.height + 8}
                  rx="8"
                  fill="black"
                />
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="rgba(0,0,0,0.6)" mask="url(#cutout)" />
            {/* Highlight border */}
            <rect
              x={highlightRect.left - 4}
              y={highlightRect.top - 4}
              width={highlightRect.width + 8}
              height={highlightRect.height + 8}
              rx="8"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              className="animate-pulse"
            />
          </svg>
        ) : (
          <div className="w-full h-full bg-black/40" />
        )}
      </div>

      {/* Tutorial popup */}
      <div 
        className="absolute w-96 z-10"
        style={getPopupPosition()}
      >
        <Card className="relative shadow-lg">
          <CardContent className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                  {currentStep + 1} of {tutorialSteps.length}
                </span>
                <h3 className="font-semibold text-gray-900">{currentTutorialStep.title}</h3>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSkip}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="mb-6">
              <p className="text-gray-600 leading-relaxed text-sm">{currentTutorialStep.content}</p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-2">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                size="sm"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>

              <Button onClick={handleSkip} variant="ghost" size="sm" className="text-gray-500 flex-shrink-0">
                Skip tour
              </Button>

              <Button onClick={handleNext} size="sm" className="flex-shrink-0">
                {currentStep === tutorialSteps.length - 1 ? (
                  "Setup Inventory"
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
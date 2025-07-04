import { useState } from "react";
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
    target: "main-content",
    position: "center"
  },
  {
    title: "Weekly Meal Plan",
    content: "This is your 7-day meal planning grid. Here you'll see your planned meals for each day, organized by breakfast, lunch, and dinner. You can drag meals between days to reorganize your week.",
    target: "meal-plan",
    position: "left"
  },
  {
    title: "Your Inventory",
    content: "The sidebar shows your current food inventory. Items running low will be highlighted so you know what to buy. This helps prevent food waste and ensures you always have what you need.",
    target: "sidebar",
    position: "left"
  },
  {
    title: "Next Up To Do",
    content: "This section shows important tasks like meal prep activities and shopping reminders. Check off items as you complete them to stay organized.",
    target: "tasks",
    position: "bottom"
  }
];

export default function Tutorial({ open, onComplete }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!open) return null;

  const currentTutorialStep = tutorialSteps[currentStep];

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

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Highlight overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {currentTutorialStep.target !== "center" && (
          <div className="w-full h-full relative">
            {/* This would highlight specific sections - simplified for now */}
            <div className="absolute inset-0 bg-black/20" />
          </div>
        )}
      </div>

      {/* Tutorial popup */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <Card className="w-full max-w-md relative">
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
              <p className="text-gray-600 leading-relaxed">{currentTutorialStep.content}</p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                size="sm"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>

              <Button onClick={handleSkip} variant="ghost" size="sm" className="text-gray-500">
                Skip tour
              </Button>

              <Button onClick={handleNext} size="sm">
                {currentStep === tutorialSteps.length - 1 ? (
                  "Let's set up your inventory"
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
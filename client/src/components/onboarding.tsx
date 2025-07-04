import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface OnboardingProps {
  open: boolean;
  onComplete: () => void;
}

interface OnboardingData {
  budget: string;
  dietaryRestrictions: string[];
  cuisines: string[];
  cookingFrequency: {
    breakfast: number;
    lunch: number;
    dinner: number;
  };
  difficultyRange: [number, number];
  includeLeftovers: boolean;
}

const budgetOptions = [
  { value: "under-5", label: "Under $5" },
  { value: "5-15", label: "Around $5 to $15" },
  { value: "above-20", label: "Above $20" },
];

const dietaryOptions = [
  "Vegetarian", "Vegan", "Gluten-free", "Pescatarian", "Keto", "Halal"
];

const cuisineOptions = [
  { 
    value: "italian", 
    label: "Italian", 
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=150&h=100&fit=crop",
    dishes: "Pasta, Pizza, Risotto"
  },
  { 
    value: "chinese", 
    label: "Chinese", 
    image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=150&h=100&fit=crop",
    dishes: "Fried Rice, Dumplings, Sweet & Sour"
  },
  { 
    value: "japanese", 
    label: "Japanese", 
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=150&h=100&fit=crop",
    dishes: "Sushi, Ramen, Tempura"
  },
  { 
    value: "indian", 
    label: "Indian", 
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=150&h=100&fit=crop",
    dishes: "Curry, Biryani, Naan"
  },
  { 
    value: "mexican", 
    label: "Mexican", 
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=150&h=100&fit=crop",
    dishes: "Tacos, Burritos, Quesadillas"
  },
  { 
    value: "thai", 
    label: "Thai", 
    image: "https://images.unsplash.com/photo-1559847844-5315695dadae?w=150&h=100&fit=crop",
    dishes: "Pad Thai, Green Curry, Tom Yum"
  },
  { 
    value: "korean", 
    label: "Korean", 
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=150&h=100&fit=crop",
    dishes: "Kimchi, Bulgogi, Bibimbap"
  },
  { 
    value: "vietnamese", 
    label: "Vietnamese", 
    image: "https://images.unsplash.com/photo-1559314809-0f31657def5e?w=150&h=100&fit=crop",
    dishes: "Pho, Banh Mi, Spring Rolls"
  },
  { 
    value: "french", 
    label: "French", 
    image: "https://images.unsplash.com/photo-1601972599720-ad8689871ba9?w=150&h=100&fit=crop",
    dishes: "Croissants, Coq au Vin, Ratatouille"
  },
  { 
    value: "american", 
    label: "American", 
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=150&h=100&fit=crop",
    dishes: "Burgers, BBQ, Mac & Cheese"
  },
  { 
    value: "spanish", 
    label: "Spanish", 
    image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=150&h=100&fit=crop",
    dishes: "Paella, Tapas, Gazpacho"
  },
  { 
    value: "mediterranean", 
    label: "Mediterranean", 
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=150&h=100&fit=crop",
    dishes: "Hummus, Greek Salad, Kebabs"
  },
  { 
    value: "middle-eastern", 
    label: "Middle Eastern", 
    image: "https://images.unsplash.com/photo-1563379091569-18d7e2e1e3cb?w=150&h=100&fit=crop",
    dishes: "Falafel, Shawarma, Tabbouleh"
  },
  { 
    value: "caribbean", 
    label: "Caribbean", 
    image: "https://images.unsplash.com/photo-1547520175-a40e2656ce50?w=150&h=100&fit=crop",
    dishes: "Jerk Chicken, Rice & Beans, Plantains"
  },
];

const difficultyLevels = [
  "Quick & easy: Prep & cook in ≤30 min, usually one-pot / sheet-pan, minimal cleanup",
  "Stovetop & oven combos: multiple elements but straightforward techniques",
  "Layered dishes: several components assembled (proteins, starch, sauce)",
  "Intermediate techniques: involves specialised skills or tools"
];

const steps = [
  "Budget",
  "Dietary Restrictions", 
  "Cuisine Preferences",
  "Cooking Frequency",
  "Difficulty Range",
  "Other Preferences"
];

export default function Onboarding({ open, onComplete }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    budget: "",
    dietaryRestrictions: [],
    cuisines: [],
    cookingFrequency: { breakfast: 0, lunch: 0, dinner: 0 },
    difficultyRange: [0, 3],
    includeLeftovers: false,
  });

  if (!open) return null;

  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('onboardingData', JSON.stringify(data));
    onComplete();
  };

  const toggleSelection = (category: keyof OnboardingData, value: string) => {
    if (category === 'dietaryRestrictions' || category === 'cuisines') {
      const currentArray = data[category] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      setData({ ...data, [category]: newArray });
    } else {
      setData({ ...data, [category]: value });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0: // Budget
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What's your budget per meal?</h2>
              <p className="text-gray-600">This helps us suggest recipes that fit your spending goals.</p>
            </div>
            <div className="space-y-3">
              {budgetOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setData({ ...data, budget: option.value })}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    data.budget === option.value
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 1: // Dietary Restrictions
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Any dietary restrictions?</h2>
              <p className="text-gray-600">Select all that apply to personalize your meal suggestions.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {dietaryOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => toggleSelection('dietaryRestrictions', option)}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    data.dietaryRestrictions.includes(option)
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 2: // Cuisines
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What cuisines do you enjoy?</h2>
              <p className="text-gray-600">Choose your favorites to get personalized meal recommendations.</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {cuisineOptions.map((cuisine) => (
                <button
                  key={cuisine.value}
                  onClick={() => toggleSelection('cuisines', cuisine.value)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    data.cuisines.includes(cuisine.value)
                      ? 'border-primary bg-primary/10'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img 
                    src={cuisine.image} 
                    alt={cuisine.label}
                    className="w-full h-20 object-cover rounded mb-2"
                  />
                  <h3 className="font-medium text-gray-900">{cuisine.label}</h3>
                  <p className="text-xs text-gray-500 mt-1">{cuisine.dishes}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 3: // Cooking Frequency
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">How often do you cook?</h2>
              <p className="text-gray-600">Set your cooking frequency for each meal type.</p>
            </div>
            <div className="space-y-8">
              {(['breakfast', 'lunch', 'dinner'] as const).map((meal) => (
                <div key={meal} className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium capitalize">{meal}</h3>
                    <span className="text-sm text-gray-500">
                      {data.cookingFrequency[meal] === 0 ? 'Never' : 
                       data.cookingFrequency[meal] === 7 ? 'Daily' : 
                       `${data.cookingFrequency[meal]} times/week`}
                    </span>
                  </div>
                  <Slider
                    value={[data.cookingFrequency[meal]]}
                    onValueChange={([value]) => 
                      setData({
                        ...data,
                        cookingFrequency: { ...data.cookingFrequency, [meal]: value }
                      })
                    }
                    max={7}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Never</span>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>Daily</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 4: // Difficulty Range
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What's your cooking skill range?</h2>
              <p className="text-gray-600">Choose the range of cooking difficulty you're comfortable with.</p>
            </div>
            <div className="space-y-6">
              <Slider
                value={data.difficultyRange}
                onValueChange={(value) => setData({ ...data, difficultyRange: value as [number, number] })}
                max={3}
                step={1}
                className="w-full"
                minStepsBetweenThumbs={0}
              />
              <div className="space-y-3">
                {difficultyLevels.map((level, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${
                      index >= data.difficultyRange[0] && index <= data.difficultyRange[1]
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200'
                    }`}
                  >
                    <p className="text-sm">{level}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 5: // Other Preferences
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">One more thing...</h2>
              <p className="text-gray-600">Help us fine-tune your meal planning experience.</p>
            </div>
            <div className="space-y-4">
              <button
                onClick={() => setData({ ...data, includeLeftovers: !data.includeLeftovers })}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  data.includeLeftovers
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>Include leftovers as meals?</span>
                  <span className="text-sm">
                    {data.includeLeftovers ? 'Yes' : 'No'}
                  </span>
                </div>
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      
      {/* Modal */}
      <Card className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
        <CardContent className="p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>

          {/* Step Content */}
          {renderStep()}

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button onClick={handleComplete} className="bg-primary hover:bg-primary/90">
                Let's get started
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
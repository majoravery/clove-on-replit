import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface InventorySetupProps {
  open: boolean;
  onComplete: () => void;
}

const categories = [
  {
    id: "produce",
    title: "Produce",
    items: ["Apples", "Bananas", "Carrots", "Onions", "Potatoes", "Tomatoes", "Lettuce", "Spinach", "Bell Peppers", "Broccoli"]
  },
  {
    id: "dairy-eggs",
    title: "Dairy & Eggs",
    items: ["Milk", "Eggs", "Butter", "Cheese", "Yogurt", "Cream", "Sour Cream"]
  },
  {
    id: "meat-seafood",
    title: "Meat & Seafood",
    items: ["Chicken Breast", "Ground Beef", "Salmon", "Shrimp", "Pork Chops", "Turkey", "Bacon"]
  },
  {
    id: "grains-pasta",
    title: "Grains & Pasta",
    items: ["Rice", "Pasta", "Bread", "Quinoa", "Oats", "Flour", "Cereal"]
  },
  {
    id: "baking",
    title: "Baking Supplies",
    items: ["Sugar", "Brown Sugar", "Baking Powder", "Baking Soda", "Vanilla Extract", "Salt", "Cinnamon"]
  },
  {
    id: "canned-jarred",
    title: "Canned & Jarred Goods",
    items: ["Canned Tomatoes", "Beans", "Tuna", "Chicken Broth", "Peanut Butter", "Jam", "Pickles"]
  },
  {
    id: "oils-vinegars",
    title: "Oils & Vinegars",
    items: ["Olive Oil", "Vegetable Oil", "Coconut Oil", "Balsamic Vinegar", "Apple Cider Vinegar"]
  },
  {
    id: "sauces-condiments",
    title: "Sauces & Condiments",
    items: ["Ketchup", "Mustard", "Mayo", "Soy Sauce", "Hot Sauce", "BBQ Sauce", "Ranch"]
  },
  {
    id: "spices-herbs",
    title: "Spices & Herbs",
    items: ["Black Pepper", "Garlic Powder", "Paprika", "Oregano", "Basil", "Thyme", "Cumin"]
  },
  {
    id: "refrigerated",
    title: "Refrigerated Perishables",
    items: ["Hummus", "Salsa", "Deli Meat", "Fresh Herbs", "Leftovers"]
  },
  {
    id: "frozen",
    title: "Frozen Items",
    items: ["Frozen Vegetables", "Frozen Fruit", "Ice Cream", "Frozen Pizza", "Frozen Fish"]
  },
  {
    id: "beverages",
    title: "Beverages",
    items: ["Water", "Coffee", "Tea", "Juice", "Soda", "Beer", "Wine"]
  }
];

export default function InventorySetup({ open, onComplete }: InventorySetupProps) {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>({});
  const [customItem, setCustomItem] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  if (!open) return null;

  const currentCategory = categories[currentCategoryIndex];
  const progress = ((currentCategoryIndex + 1) / categories.length) * 100;

  const handleItemToggle = (item: string) => {
    const categoryId = currentCategory.id;
    const currentItems = selectedItems[categoryId] || [];
    const newItems = currentItems.includes(item)
      ? currentItems.filter(i => i !== item)
      : [...currentItems, item];
    
    setSelectedItems({ ...selectedItems, [categoryId]: newItems });
  };

  const handleCustomItemAdd = () => {
    if (customItem.trim()) {
      const categoryId = currentCategory.id;
      const currentItems = selectedItems[categoryId] || [];
      const trimmedItem = customItem.trim();
      
      // Check if item already exists in predefined items or custom items
      const allExistingItems = [...currentCategory.items, ...currentItems];
      const itemExists = allExistingItems.some(item => 
        item.toLowerCase() === trimmedItem.toLowerCase()
      );
      
      if (!itemExists) {
        setSelectedItems({ 
          ...selectedItems, 
          [categoryId]: [...currentItems, trimmedItem] 
        });
        setCustomItem("");
        setShowCustomInput(false);
      } else {
        // Item already exists, show feedback or handle as needed
        alert("This item already exists in your selection.");
      }
    }
  };

  const handleNext = async () => {
    // Save progress
    localStorage.setItem('inventoryProgress', JSON.stringify(selectedItems));
    
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1);
    } else {
      // Complete setup
      localStorage.setItem('userInventory', JSON.stringify(selectedItems));
      localStorage.setItem('setupCompleted', 'true');
      
      try {
        // Switch to demo state on server
        await apiRequest('POST', '/api/set-demo-state');
      } catch (error) {
        console.error('Failed to switch to demo state:', error);
      }
      
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1);
    }
  };

  const currentSelectedItems = selectedItems[currentCategory.id] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      
      {/* Modal */}
      <Card className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden mx-4">
        <div className="flex h-full">
          {/* Sidebar Progress */}
          <div className="w-80 bg-gray-50 border-r p-6 overflow-y-auto">
            <h3 className="font-semibold text-gray-900 mb-4">Inventory Setup</h3>
            <div className="space-y-3">
              {categories.map((category, index) => (
                <div
                  key={category.id}
                  className={`p-3 rounded-lg text-sm transition-colors ${
                    index === currentCategoryIndex
                      ? 'bg-primary text-white'
                      : index < currentCategoryIndex
                      ? 'bg-green-100 text-green-800'
                      : 'bg-white text-gray-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{category.title}</span>
                    {index < currentCategoryIndex && (
                      <span className="text-xs">✓</span>
                    )}
                  </div>
                  {index < currentCategoryIndex && selectedItems[category.id] && (
                    <div className="text-xs mt-1 opacity-80">
                      {selectedItems[category.id].length} items selected
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <CardContent className="p-8 flex-1 overflow-y-auto">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Category {currentCategoryIndex + 1} of {categories.length}</span>
                  <span>{Math.round(progress)}% complete</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>

              {/* Category Content */}
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentCategory.title}</h2>
                  <p className="text-gray-600">Select the items you currently have in this category.</p>
                </div>

                {/* Item Selection */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {/* Predefined Items */}
                  {currentCategory.items.map((item) => (
                    <button
                      key={`predefined-${item}`}
                      onClick={() => handleItemToggle(item)}
                      className={`p-3 rounded-lg border-2 text-sm transition-all ${
                        currentSelectedItems.includes(item)
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                  
                  {/* Custom Items */}
                  {currentSelectedItems
                    .filter(item => !currentCategory.items.includes(item))
                    .map((item) => (
                      <button
                        key={`custom-${item}`}
                        onClick={() => handleItemToggle(item)}
                        className="p-3 rounded-lg border-2 border-primary bg-primary/10 text-primary text-sm transition-all"
                      >
                        {item}
                      </button>
                    ))}
                  
                  {/* Custom Item Button/Input */}
                  {!showCustomInput ? (
                    <button
                      onClick={() => setShowCustomInput(true)}
                      className="p-3 rounded-lg border-2 border-dashed border-gray-300 text-gray-500 hover:border-gray-400 text-sm"
                    >
                      <Plus className="h-4 w-4 mx-auto mb-1" />
                      Others: please specify
                    </button>
                  ) : (
                    <div className="p-3 border-2 border-primary rounded-lg">
                      <Input
                        value={customItem}
                        onChange={(e) => setCustomItem(e.target.value)}
                        placeholder="Enter item name"
                        className="text-sm mb-2"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleCustomItemAdd();
                          }
                        }}
                        autoFocus
                      />
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={handleCustomItemAdd}>Add</Button>
                        <Button size="sm" variant="ghost" onClick={() => {
                          setShowCustomInput(false);
                          setCustomItem("");
                        }}>Cancel</Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>

            {/* Navigation */}
            <div className="border-t p-6">
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentCategoryIndex === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>

                <Button onClick={handleNext}>
                  {currentCategoryIndex === categories.length - 1 ? (
                    "Complete Setup"
                  ) : (
                    <>
                      Next Category
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
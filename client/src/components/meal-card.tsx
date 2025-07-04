import { useDrag } from "react-dnd";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, X } from "lucide-react";
import type { Meal } from "@shared/schema";

interface MealCardProps {
  meal: Meal;
  onDragEnd: () => void;
  onSkipMeal: (mealId: string) => void;
}

export default function MealCard({ meal, onDragEnd, onSkipMeal }: MealCardProps) {
  const [{ isDragging }, drag] = useDrag({
    type: "meal",
    item: { 
      id: meal.id, 
      type: meal.type, 
      dayId: meal.dayId 
    },
    end: () => {
      onDragEnd();
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600";
      case "Medium":
        return "text-yellow-600";
      case "Hard":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div
      ref={drag}
      className={`meal-card bg-gray-50 rounded-lg p-3 cursor-move hover:shadow-md transition-all ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <img 
        src={meal.image} 
        alt={meal.title}
        className="w-full h-20 object-cover rounded mb-2"
        loading="lazy"
      />
      <h4 className="text-sm font-medium text-gray-900 mb-1">{meal.title}</h4>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{meal.cuisine}</span>
        <div className="flex items-center text-xs text-gray-500">
          <Star className="h-3 w-3 text-yellow-400 mr-1 fill-current" />
          <span className={getDifficultyColor(meal.difficulty)}>{meal.difficulty}</span>
        </div>
      </div>
      {(meal.type === "dinner" || meal.type === "lunch") && (
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
          onClick={(e) => {
            e.stopPropagation();
            onSkipMeal(meal.id);
          }}
        >
          <X className="h-3 w-3 mr-1" />
          Skip Meal
        </Button>
      )}
    </div>
  );
}

import { useDrag } from "react-dnd";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import type { Meal } from "@shared/schema";

interface MealCardProps {
  meal: Meal;
  onDragEnd: () => void;
  onSkipMeal: (mealId: string) => void;
}

export default function MealCard({ meal, onDragEnd, onSkipMeal }: MealCardProps) {
  const isPlaceholder = !meal.image || meal.title.startsWith("Plan your");
  
  const [{ isDragging }, drag] = useDrag({
    type: "meal",
    item: { 
      id: meal.id, 
      type: meal.type, 
      dayId: meal.dayId 
    },
    end: () => {
      if (!isPlaceholder) {
        onDragEnd();
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !isPlaceholder,
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

  if (isPlaceholder) {
    return (
      <div className="meal-card bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-3 transition-all">
        <Badge variant="outline" className="text-xs uppercase mb-2">
          {meal.type}
        </Badge>
        <div className="w-full h-20 bg-gray-100 rounded mb-2 flex items-center justify-center">
          <span className="text-xs text-gray-400">No meal planned</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={drag}
      className={`meal-card bg-white rounded-lg p-3 cursor-move hover:shadow-md transition-all border border-gray-200 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <Badge variant="outline" className="text-xs uppercase">
          {meal.type}
        </Badge>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 w-6 p-0 hover:bg-red-50"
          onClick={() => onSkipMeal(meal.id)}
        >
          <X className="h-3 w-3 text-gray-400 hover:text-red-500" />
        </Button>
      </div>
      <img 
        src={meal.image} 
        alt={meal.title}
        className="w-full h-20 object-cover rounded mb-2"
        loading="lazy"
      />
      <h4 className="text-sm font-medium text-gray-900 mb-1">{meal.title}</h4>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{meal.cuisine}</span>
        <span className={`text-xs ${getDifficultyColor(meal.difficulty)}`}>
          {meal.difficulty}
        </span>
      </div>
    </div>
  );
}

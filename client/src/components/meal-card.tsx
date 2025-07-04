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
      <Badge variant="outline" className="text-xs uppercase mb-2">
        {meal.type}
      </Badge>
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

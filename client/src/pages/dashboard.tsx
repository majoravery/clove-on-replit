import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Sidebar from "@/components/sidebar";
import MealCard from "@/components/meal-card";
import PremiumModal from "@/components/premium-modal";
import { Loader2, RefreshCw, History, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { DashboardData } from "@shared/schema";

export default function Dashboard() {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: dashboardData, isLoading } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard"],
  });

  const regenerateMutation = useMutation({
    mutationFn: () => apiRequest("/api/regenerate", "POST"),
    onMutate: () => {
      setIsRegenerating(true);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/dashboard"], (old: DashboardData | undefined) => {
        if (!old) return old;
        return {
          ...old,
          regenerationsLeft: data.regenerationsLeft,
        };
      });
      toast({
        title: "Meal plan regenerated",
        description: "Your meal plan has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to regenerate",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsRegenerating(false);
    },
  });

  const skipMealMutation = useMutation({
    mutationFn: (mealId: string) => apiRequest("/api/skip-meal", "POST", { mealId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard"] });
      toast({
        title: "Meal skipped",
        description: "The meal has been removed and your plan updated.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to skip meal",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });

  const handleDragEnd = () => {
    setShowPremiumModal(true);
  };

  const handleSkipMeal = (mealId: string) => {
    if (confirm("Are you sure you want to skip this meal? This will regenerate the plan from this point forward.")) {
      skipMealMutation.mutate(mealId);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Failed to load dashboard data</p>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen flex bg-gray-50">
        <Sidebar 
          inventory={dashboardData.inventory} 
          tasks={dashboardData.tasks} 
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header Actions */}
          <div className="bg-white border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Meal Dashboard</h1>
                <p className="text-sm text-gray-500 mt-1">Plan your week, reduce waste, save money</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" disabled className="opacity-50">
                  <History className="h-4 w-4 mr-2" />
                  View Past Plans
                </Button>
                <Button 
                  onClick={() => regenerateMutation.mutate()}
                  disabled={dashboardData.regenerationsLeft === 0 || isRegenerating}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isRegenerating ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4 mr-2" />
                  )}
                  {isRegenerating 
                    ? "Generating..." 
                    : dashboardData.regenerationsLeft === 0 
                      ? "No regenerations left"
                      : `Regenerate Plan (${dashboardData.regenerationsLeft} left)`
                  }
                </Button>
              </div>
            </div>
          </div>

          {/* Next Up To Do Section */}
          <div className="bg-white border-b border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 text-accent mr-2" />
              Next Up To Do
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {dashboardData.tasks.map((task) => (
                <Card key={task.id} className={`${task.bgColor} border ${task.borderColor}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className={`${task.textColor} uppercase text-xs`}>
                        {task.type}
                      </Badge>
                      <span className={`text-xs ${task.textColor}`}>{task.time}</span>
                    </div>
                    <h3 className="font-medium text-gray-900 mb-1">{task.title}</h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* 7-Day Calendar */}
          <div className="flex-1 p-6 bg-gray-50 overflow-auto">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">7-Day Meal Plan</h2>
              <p className="text-sm text-gray-600">Drag meals between days to reorganize your plan</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
              {dashboardData.weekDays.map((day) => (
                <Card key={day.id} className="overflow-hidden">
                  <CardHeader className={`p-4 border-b ${day.isToday ? 'bg-primary text-white' : 'bg-white'}`}>
                    <CardTitle className="text-sm">{day.name}</CardTitle>
                    <p className={`text-xs ${day.isToday ? 'opacity-90' : 'text-gray-500'}`}>{day.date}</p>
                  </CardHeader>
                  
                  {day.actionItems.length > 0 && (
                    <div className="p-3 border-b border-gray-100 bg-blue-50">
                      <div className="flex items-center text-xs text-blue-600 mb-2">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Action Items</span>
                      </div>
                      {day.actionItems.map((item, index) => (
                        <p key={index} className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded">
                          {item}
                        </p>
                      ))}
                    </div>
                  )}
                  
                  <CardContent className="p-3 space-y-3">
                    {day.meals.map((meal) => (
                      <MealCard
                        key={meal.id}
                        meal={meal}
                        onDragEnd={handleDragEnd}
                        onSkipMeal={handleSkipMeal}
                      />
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <PremiumModal 
          open={showPremiumModal} 
          onClose={() => setShowPremiumModal(false)} 
        />
      </div>
    </DndProvider>
  );
}

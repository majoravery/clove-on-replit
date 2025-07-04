import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import Sidebar from "@/components/sidebar";
import MealCard from "@/components/meal-card";
import PremiumModal from "@/components/premium-modal";
import Onboarding from "@/components/onboarding";
import Tutorial from "@/components/tutorial";
import InventorySetup from "@/components/inventory-setup";
import { Loader2, RefreshCw, History, Clock, User, Settings, HelpCircle, LogOut, Calendar, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { DashboardData } from "@shared/schema";

export default function Dashboard() {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !localStorage.getItem('onboardingData');
  });
  const [showTutorial, setShowTutorial] = useState(false);
  const [showInventorySetup, setShowInventorySetup] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: dashboardData, isLoading } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard"],
  });

  // Check if setup is completed and switch to demo state
  const setupCompletedMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/set-demo-state"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard"] });
      toast({
        title: "Setup completed!",
        description: "Your meal plan and inventory have been populated with demo data.",
      });
    },
    onError: (error: any) => {
      console.error('Failed to complete setup:', error);
      toast({
        title: "Setup error",
        description: "Failed to initialize demo data, please try again.",
        variant: "destructive",
      });
    },
  });

  const regenerateMutation = useMutation({
    mutationFn: () => apiRequest("POST", "/api/regenerate"),
    onMutate: () => {
      setIsRegenerating(true);
    },
    onSuccess: (data: any) => {
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
    mutationFn: (mealId: string) => apiRequest("POST", "/api/skip-meal", { mealId }),
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

  const handleTaskToggle = (taskId: string) => {
    setCompletedTasks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const resetAppMutation = useMutation({
    mutationFn: () => apiRequest("/api/set-empty-state", "POST"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard"] });
      toast({
        title: "App reset",
        description: "The app has been reset to empty state for testing.",
      });
    },
  });

  const handleResetApp = () => {
    if (confirm("Are you sure you want to reset the app to empty for testing? This will clear all data.")) {
      localStorage.clear();
      setShowOnboarding(true);
      setShowTutorial(false);
      setShowInventorySetup(false);
      setCompletedTasks(new Set());
      
      // Switch to empty state
      resetAppMutation.mutate();
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
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Clove</h1>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleResetApp}
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                Reset App
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Help
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">


            {/* Next Up To Do Section */}
            <div className="bg-white border-b border-gray-200 p-6" data-tutorial="tasks">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 text-accent mr-2" />
                Next Up To Do
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dashboardData.tasks.map((task) => {
                  const isCompleted = completedTasks.has(task.id);
                  const isPlaceholder = task.id === "placeholder";
                  
                  return (
                    <Card key={task.id} className={`${task.bgColor} border-2 ${isPlaceholder ? 'border-dashed' : ''} ${task.borderColor} ${isCompleted ? 'opacity-50' : ''}`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {!isPlaceholder && (
                              <Checkbox 
                                checked={isCompleted}
                                onCheckedChange={() => handleTaskToggle(task.id)}
                                className="h-4 w-4"
                              />
                            )}
                            <Badge variant="outline" className={`${task.textColor} uppercase text-xs`}>
                              {task.type}
                            </Badge>
                          </div>
                          <span className={`text-xs ${task.textColor}`}>{task.time}</span>
                        </div>
                        <h3 className={`font-medium mb-1 ${isCompleted ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className={`text-sm ${isCompleted ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                            {task.description}
                          </p>
                        )}
                        {isCompleted && !isPlaceholder && (
                          <div className="flex items-center mt-2 text-green-600">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            <span className="text-xs">Completed</span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* 7-Day Calendar */}
            <div className="flex-1 p-6 bg-gray-50 overflow-auto" data-tutorial="meal-plan">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Calendar className="h-5 w-5 text-accent mr-2" />
                  7-Day Meal Plan
                </h2>
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                {dashboardData.weekDays.map((day) => (
                  <Card key={day.id} className="overflow-hidden">
                    <CardHeader className="p-4 border-b bg-white">
                      <CardTitle className="text-sm">{day.name}</CardTitle>
                      <p className="text-xs text-gray-500">{day.date}</p>
                    </CardHeader>
                    
                    <CardContent className="p-3 space-y-3">
                      {/* Action Items as Cards */}
                      {day.actionItems.map((item, index) => (
                        <div key={`action-${index}`} className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                          <div className="flex items-center text-xs text-blue-600 mb-2">
                            <Clock className="h-3 w-3 mr-1" />
                            <span className="uppercase font-medium">Action</span>
                          </div>
                          <p className="text-sm text-blue-700 font-medium">{item}</p>
                        </div>
                      ))}
                      
                      {/* Meal Cards */}
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
          
          {/* Sidebar */}
          <div data-tutorial="sidebar">
            <Sidebar 
              inventory={dashboardData.inventory} 
              tasks={dashboardData.tasks} 
            />
          </div>
        </div>

        <PremiumModal 
          open={showPremiumModal} 
          onClose={() => setShowPremiumModal(false)} 
        />

        <Onboarding
          open={showOnboarding}
          onComplete={() => {
            setShowOnboarding(false);
            setShowTutorial(true);
          }}
        />

        <Tutorial
          open={showTutorial}
          onComplete={() => {
            setShowTutorial(false);
            setShowInventorySetup(true);
          }}
        />

        <InventorySetup
          open={showInventorySetup}
          onComplete={() => {
            setShowInventorySetup(false);
            localStorage.setItem('setupCompleted', 'true');
            // Switch to demo state after inventory setup completion
            setupCompletedMutation.mutate();
          }}
        />
      </div>
    </DndProvider>
  );
}
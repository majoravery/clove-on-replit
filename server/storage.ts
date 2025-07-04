import type { DashboardData } from "@shared/schema";

export interface IStorage {
  getDashboardData(): Promise<DashboardData>;
  updateRegenerationsLeft(count: number): Promise<void>;
  skipMeal(mealId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private getEmptyState(): DashboardData {
    return {
      inventory: [],
      tasks: [
        {
          id: "placeholder",
          type: "prep",
          title: "Nothing to do for now!",
          description: "",
          time: "",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          textColor: "text-gray-500"
        }
      ],
      weekDays: [
        {
          id: "monday",
          name: "Monday",
          date: "Dec 23",
          isToday: false,
          actionItems: [],
          meals: [
            { id: "mon-breakfast", type: "breakfast", title: "Plan your breakfast", image: "", cuisine: "", difficulty: "Easy", dayId: "monday" },
            { id: "mon-lunch", type: "lunch", title: "Plan your lunch", image: "", cuisine: "", difficulty: "Easy", dayId: "monday" },
            { id: "mon-dinner", type: "dinner", title: "Plan your dinner", image: "", cuisine: "", difficulty: "Easy", dayId: "monday" }
          ]
        },
        {
          id: "tuesday", 
          name: "Tuesday",
          date: "Dec 24",
          isToday: false,
          actionItems: [],
          meals: [
            { id: "tue-breakfast", type: "breakfast", title: "Plan your breakfast", image: "", cuisine: "", difficulty: "Easy", dayId: "tuesday" },
            { id: "tue-lunch", type: "lunch", title: "Plan your lunch", image: "", cuisine: "", difficulty: "Easy", dayId: "tuesday" },
            { id: "tue-dinner", type: "dinner", title: "Plan your dinner", image: "", cuisine: "", difficulty: "Easy", dayId: "tuesday" }
          ]
        },
        {
          id: "wednesday",
          name: "Wednesday", 
          date: "Dec 25",
          isToday: true,
          actionItems: [],
          meals: [
            { id: "wed-breakfast", type: "breakfast", title: "Plan your breakfast", image: "", cuisine: "", difficulty: "Easy", dayId: "wednesday" },
            { id: "wed-lunch", type: "lunch", title: "Plan your lunch", image: "", cuisine: "", difficulty: "Easy", dayId: "wednesday" },
            { id: "wed-dinner", type: "dinner", title: "Plan your dinner", image: "", cuisine: "", difficulty: "Easy", dayId: "wednesday" }
          ]
        },
        {
          id: "thursday",
          name: "Thursday",
          date: "Dec 26",
          isToday: false,
          actionItems: [],
          meals: [
            { id: "thu-breakfast", type: "breakfast", title: "Plan your breakfast", image: "", cuisine: "", difficulty: "Easy", dayId: "thursday" },
            { id: "thu-lunch", type: "lunch", title: "Plan your lunch", image: "", cuisine: "", difficulty: "Easy", dayId: "thursday" },
            { id: "thu-dinner", type: "dinner", title: "Plan your dinner", image: "", cuisine: "", difficulty: "Easy", dayId: "thursday" }
          ]
        },
        {
          id: "friday",
          name: "Friday",
          date: "Dec 27",
          isToday: false,
          actionItems: [],
          meals: [
            { id: "fri-breakfast", type: "breakfast", title: "Plan your breakfast", image: "", cuisine: "", difficulty: "Easy", dayId: "friday" },
            { id: "fri-lunch", type: "lunch", title: "Plan your lunch", image: "", cuisine: "", difficulty: "Easy", dayId: "friday" },
            { id: "fri-dinner", type: "dinner", title: "Plan your dinner", image: "", cuisine: "", difficulty: "Easy", dayId: "friday" }
          ]
        },
        {
          id: "saturday",
          name: "Saturday",
          date: "Dec 28",
          isToday: false,
          actionItems: [],
          meals: [
            { id: "sat-breakfast", type: "breakfast", title: "Plan your breakfast", image: "", cuisine: "", difficulty: "Easy", dayId: "saturday" },
            { id: "sat-lunch", type: "lunch", title: "Plan your lunch", image: "", cuisine: "", difficulty: "Easy", dayId: "saturday" },
            { id: "sat-dinner", type: "dinner", title: "Plan your dinner", image: "", cuisine: "", difficulty: "Easy", dayId: "saturday" }
          ]
        },
        {
          id: "sunday",
          name: "Sunday",
          date: "Dec 29",
          isToday: false,
          actionItems: [],
          meals: [
            { id: "sun-breakfast", type: "breakfast", title: "Plan your breakfast", image: "", cuisine: "", difficulty: "Easy", dayId: "sunday" },
            { id: "sun-lunch", type: "lunch", title: "Plan your lunch", image: "", cuisine: "", difficulty: "Easy", dayId: "sunday" },
            { id: "sun-dinner", type: "dinner", title: "Plan your dinner", image: "", cuisine: "", difficulty: "Easy", dayId: "sunday" }
          ]
        }
      ],
      regenerationsLeft: 3
    };
  }

  private getFullDemoData(): DashboardData {
    return {
      inventory: [
        { id: "chicken", name: "Chicken Breast", quantity: "2 lbs", status: "normal", icon: "🍗" },
        { id: "tomatoes", name: "Cherry Tomatoes", quantity: "1 container", status: "normal", icon: "🍅" },
        { id: "pasta", name: "Spaghetti", quantity: "1 box", status: "normal", icon: "🍝" },
        { id: "eggs", name: "Eggs", quantity: "6 count", status: "low", icon: "🥚" },
        { id: "milk", name: "Milk", quantity: "1 gallon", status: "low", icon: "🥛" },
        { id: "bread", name: "Sourdough Bread", quantity: "1 loaf", status: "normal", icon: "🍞" }
      ],
      tasks: [
        {
          id: "1",
          type: "prep",
          title: "Marinate chicken",
          description: "For tonight's dinner",
          time: "15 min",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          textColor: "text-blue-800"
        },
        {
          id: "2",
          type: "shopping",
          title: "Buy more eggs",
          description: "Running low",
          time: "",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
          textColor: "text-orange-800"
        },
        {
          id: "3",
          type: "prep",
          title: "Prep vegetables",
          description: "For tomorrow's stir-fry",
          time: "20 min",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          textColor: "text-green-800"
        }
      ],
      weekDays: [
        {
          id: "monday",
          name: "Monday",
          date: "Dec 23",
          isToday: false,
          actionItems: ["Shop for eggs", "Prep vegetables"],
          meals: [
            {
              id: "1",
              type: "breakfast",
              title: "Avocado Toast",
              image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop",
              cuisine: "Modern",
              difficulty: "Easy",
              dayId: "monday"
            },
            {
              id: "2",
              type: "lunch",
              title: "Caesar Salad",
              image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&h=300&fit=crop",
              cuisine: "Mediterranean",
              difficulty: "Easy",
              dayId: "monday"
            },
            {
              id: "3",
              type: "dinner",
              title: "Grilled Chicken",
              image: "https://images.unsplash.com/photo-1598515213692-d4eee2a31304?w=400&h=300&fit=crop",
              cuisine: "American",
              difficulty: "Medium",
              dayId: "monday"
            }
          ]
        },
        {
          id: "tuesday",
          name: "Tuesday",
          date: "Dec 24",
          isToday: false,
          actionItems: [],
          meals: [
            {
              id: "4",
              type: "breakfast",
              title: "Greek Yogurt Bowl",
              image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop",
              cuisine: "Mediterranean",
              difficulty: "Easy",
              dayId: "tuesday"
            },
            {
              id: "5",
              type: "lunch",
              title: "Quinoa Salad",
              image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
              cuisine: "Modern",
              difficulty: "Easy",
              dayId: "tuesday"
            },
            {
              id: "6",
              type: "dinner",
              title: "Pasta Carbonara",
              image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
              cuisine: "Italian",
              difficulty: "Medium",
              dayId: "tuesday"
            }
          ]
        },
        {
          id: "wednesday",
          name: "Wednesday",
          date: "Dec 25",
          isToday: true,
          actionItems: ["Marinate chicken", "Prep vegetables"],
          meals: [
            {
              id: "7",
              type: "breakfast",
              title: "Scrambled Eggs",
              image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
              cuisine: "American",
              difficulty: "Easy",
              dayId: "wednesday"
            },
            {
              id: "8",
              type: "lunch",
              title: "Caprese Sandwich",
              image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop",
              cuisine: "Italian",
              difficulty: "Easy",
              dayId: "wednesday"
            },
            {
              id: "9",
              type: "dinner",
              title: "Chicken Stir-fry",
              image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
              cuisine: "Asian",
              difficulty: "Medium",
              dayId: "wednesday"
            }
          ]
        },
        {
          id: "thursday",
          name: "Thursday",
          date: "Dec 26",
          isToday: false,
          actionItems: [],
          meals: [
            {
              id: "10",
              type: "breakfast",
              title: "Oatmeal",
              image: "https://images.unsplash.com/photo-1574168280036-9cc8bbc2e4d7?w=400&h=300&fit=crop",
              cuisine: "Modern",
              difficulty: "Easy",
              dayId: "thursday"
            },
            {
              id: "11",
              type: "lunch",
              title: "Turkey Wrap",
              image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
              cuisine: "American",
              difficulty: "Easy",
              dayId: "thursday"
            },
            {
              id: "12",
              type: "dinner",
              title: "Salmon with Rice",
              image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
              cuisine: "Asian",
              difficulty: "Medium",
              dayId: "thursday"
            }
          ]
        },
        {
          id: "friday",
          name: "Friday",
          date: "Dec 27",
          isToday: false,
          actionItems: [],
          meals: [
            {
              id: "13",
              type: "breakfast",
              title: "Smoothie Bowl",
              image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop",
              cuisine: "Modern",
              difficulty: "Easy",
              dayId: "friday"
            },
            {
              id: "14",
              type: "lunch",
              title: "Chicken Salad",
              image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
              cuisine: "American",
              difficulty: "Easy",
              dayId: "friday"
            },
            {
              id: "15",
              type: "dinner",
              title: "Beef Tacos",
              image: "https://images.unsplash.com/photo-1565299585323-38174c26dee0?w=400&h=300&fit=crop",
              cuisine: "Mexican",
              difficulty: "Medium",
              dayId: "friday"
            }
          ]
        },
        {
          id: "saturday",
          name: "Saturday",
          date: "Dec 28",
          isToday: false,
          actionItems: [],
          meals: [
            {
              id: "16",
              type: "breakfast",
              title: "Pancakes",
              image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop",
              cuisine: "American",
              difficulty: "Medium",
              dayId: "saturday"
            },
            {
              id: "17",
              type: "lunch",
              title: "Poke Bowl",
              image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
              cuisine: "Hawaiian",
              difficulty: "Easy",
              dayId: "saturday"
            },
            {
              id: "18",
              type: "dinner",
              title: "Pizza Margherita",
              image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
              cuisine: "Italian",
              difficulty: "Hard",
              dayId: "saturday"
            }
          ]
        },
        {
          id: "sunday",
          name: "Sunday",
          date: "Dec 29",
          isToday: false,
          actionItems: [],
          meals: [
            {
              id: "19",
              type: "breakfast",
              title: "French Toast",
              image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=300&fit=crop",
              cuisine: "French",
              difficulty: "Medium",
              dayId: "sunday"
            },
            {
              id: "20",
              type: "lunch",
              title: "Soup & Salad",
              image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop",
              cuisine: "Modern",
              difficulty: "Easy",
              dayId: "sunday"
            },
            {
              id: "21",
              type: "dinner",
              title: "Roast Chicken",
              image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=400&h=300&fit=crop",
              cuisine: "American",
              difficulty: "Medium",
              dayId: "sunday"
            }
          ]
        }
      ],
      regenerationsLeft: 2
    };
  }

  private data: DashboardData;

  constructor() {
    this.data = this.getEmptyState();
  }

  async getDashboardData(): Promise<DashboardData> {
    return this.data;
  }

  async updateRegenerationsLeft(count: number): Promise<void> {
    this.data.regenerationsLeft = count;
  }

  async skipMeal(mealId: string): Promise<void> {
    // Find and remove the meal from the appropriate day
    for (const day of this.data.weekDays) {
      const mealIndex = day.meals.findIndex(meal => meal.id === mealId);
      if (mealIndex !== -1) {
        // Remove the meal
        day.meals.splice(mealIndex, 1);
        break;
      }
    }
  }

  setEmptyState(): void {
    this.data = this.getEmptyState();
  }

  setDemoState(): void {
    this.data = this.getFullDemoData();
  }
}

export const storage = new MemStorage();
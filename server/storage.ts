import type { DashboardData } from "@shared/schema";

export interface IStorage {
  getDashboardData(): Promise<DashboardData>;
  updateRegenerationsLeft(count: number): Promise<void>;
  skipMeal(mealId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private data: DashboardData = {
    inventory: [
      {
        id: "1",
        name: "Carrots",
        quantity: "2 left",
        status: "critical",
        icon: "Carrot",
      },
      {
        id: "2",
        name: "Whole Wheat Bread",
        quantity: "3 slices left",
        status: "low",
        icon: "Wheat",
      },
      {
        id: "3",
        name: "Apples",
        quantity: "8",
        status: "normal",
        icon: "Apple",
      },
      {
        id: "4",
        name: "Cheddar Cheese",
        quantity: "1 block",
        status: "normal",
        icon: "Milk",
      },
      {
        id: "5",
        name: "Eggs",
        quantity: "6",
        status: "normal",
        icon: "Egg",
      },
      {
        id: "6",
        name: "Salmon Fillet",
        quantity: "2 fillets",
        status: "normal",
        icon: "Fish",
      },
      {
        id: "7",
        name: "Spinach",
        quantity: "1 bag",
        status: "normal",
        icon: "Leaf",
      },
    ],
    tasks: [
      {
        id: "1",
        type: "prep",
        title: "Marinate chicken for tomorrow's lunch",
        description: "Season and marinate chicken breast for Thai basil stir-fry",
        time: "2 hours",
        bgColor: "bg-blue-50",
        textColor: "text-blue-600",
        borderColor: "border-blue-200",
      },
      {
        id: "2",
        type: "shopping",
        title: "Buy missing ingredients",
        description: "Pick up carrots and bread for this week's meals",
        time: "Today",
        bgColor: "bg-amber-50",
        textColor: "text-amber-600",
        borderColor: "border-amber-200",
      },
      {
        id: "3",
        type: "prep",
        title: "Defrost salmon",
        description: "Move salmon from freezer to fridge for Friday dinner",
        time: "Tomorrow",
        bgColor: "bg-green-50",
        textColor: "text-green-600",
        borderColor: "border-green-200",
      },
    ],
    weekDays: [
      {
        id: "today",
        name: "Today",
        date: "Dec 15",
        isToday: true,
        actionItems: ["Buy carrots & bread"],
        meals: [
          {
            id: "breakfast-1",
            title: "Berry Pancakes",
            cuisine: "American",
            difficulty: "Easy",
            image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
            type: "breakfast",
            dayId: "today",
          },
          {
            id: "lunch-1",
            title: "Greek Salad",
            cuisine: "Mediterranean",
            difficulty: "Easy",
            image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop",
            type: "lunch",
            dayId: "today",
          },
          {
            id: "dinner-1",
            title: "Herb Salmon",
            cuisine: "Mediterranean",
            difficulty: "Medium",
            image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop",
            type: "dinner",
            dayId: "today",
          },
        ],
      },
      {
        id: "tomorrow",
        name: "Tomorrow",
        date: "Dec 16",
        isToday: false,
        actionItems: ["Marinate chicken (evening)"],
        meals: [
          {
            id: "breakfast-2",
            title: "Fruit Oatmeal",
            cuisine: "Healthy",
            difficulty: "Easy",
            image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop",
            type: "breakfast",
            dayId: "tomorrow",
          },
          {
            id: "lunch-2",
            title: "Chicken Sandwich",
            cuisine: "American",
            difficulty: "Easy",
            image: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400&h=300&fit=crop",
            type: "lunch",
            dayId: "tomorrow",
          },
          {
            id: "dinner-2",
            title: "Veggie Stir-fry",
            cuisine: "Asian",
            difficulty: "Medium",
            image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
            type: "dinner",
            dayId: "tomorrow",
          },
        ],
      },
      {
        id: "wednesday",
        name: "Wednesday",
        date: "Dec 17",
        isToday: false,
        actionItems: [],
        meals: [
          {
            id: "dinner-3",
            title: "Tomato Soup",
            cuisine: "Comfort",
            difficulty: "Easy",
            image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
            type: "dinner",
            dayId: "wednesday",
          },
        ],
      },
      {
        id: "thursday",
        name: "Thursday",
        date: "Dec 18",
        isToday: false,
        actionItems: [],
        meals: [
          {
            id: "dinner-4",
            title: "Thai Curry",
            cuisine: "Thai",
            difficulty: "Medium",
            image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop",
            type: "dinner",
            dayId: "thursday",
          },
        ],
      },
      {
        id: "friday",
        name: "Friday",
        date: "Dec 19",
        isToday: false,
        actionItems: ["Defrost salmon"],
        meals: [
          {
            id: "dinner-5",
            title: "Herb Pasta",
            cuisine: "Italian",
            difficulty: "Easy",
            image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
            type: "dinner",
            dayId: "friday",
          },
        ],
      },
      {
        id: "saturday",
        name: "Saturday",
        date: "Dec 20",
        isToday: false,
        actionItems: [],
        meals: [
          {
            id: "dinner-6",
            title: "Gourmet Burger",
            cuisine: "American",
            difficulty: "Medium",
            image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
            type: "dinner",
            dayId: "saturday",
          },
        ],
      },
      {
        id: "sunday",
        name: "Sunday",
        date: "Dec 21",
        isToday: false,
        actionItems: [],
        meals: [
          {
            id: "breakfast-7",
            title: "Full Breakfast",
            cuisine: "American",
            difficulty: "Easy",
            image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop",
            type: "breakfast",
            dayId: "sunday",
          },
        ],
      },
    ],
    regenerationsLeft: 3,
  };

  async getDashboardData(): Promise<DashboardData> {
    return this.data;
  }

  async updateRegenerationsLeft(count: number): Promise<void> {
    this.data.regenerationsLeft = count;
  }

  async skipMeal(mealId: string): Promise<void> {
    // Find and remove the meal
    for (const day of this.data.weekDays) {
      day.meals = day.meals.filter(meal => meal.id !== mealId);
    }
  }
}

export const storage = new MemStorage();

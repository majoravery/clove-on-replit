import type { DashboardData } from "@shared/schema";

export interface IStorage {
  getDashboardData(): Promise<DashboardData>;
  updateRegenerationsLeft(count: number): Promise<void>;
  skipMeal(mealId: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private generateWeekDays(): Array<{id: string, name: string, date: string, isToday: boolean}> {
    const today = new Date();
    const days = [];
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayName = dayNames[date.getDay()];
      const monthName = monthNames[date.getMonth()];
      const dayNumber = date.getDate();
      
      days.push({
        id: dayName.toLowerCase(),
        name: dayName,
        date: `${monthName} ${dayNumber}`,
        isToday: i === 0
      });
    }
    
    return days;
  }

  private getEmptyState(): DashboardData {
    const weekDays = this.generateWeekDays();
    
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
      weekDays: weekDays.map(day => ({
        ...day,
        actionItems: [],
        meals: [
          { id: `${day.id}-breakfast`, type: "breakfast" as const, title: "", image: "", cuisine: "", difficulty: "Easy" as const, dayId: day.id },
          { id: `${day.id}-lunch`, type: "lunch" as const, title: "", image: "", cuisine: "", difficulty: "Easy" as const, dayId: day.id },
          { id: `${day.id}-dinner`, type: "dinner" as const, title: "", image: "", cuisine: "", difficulty: "Easy" as const, dayId: day.id }
        ]
      })),
      regenerationsLeft: 3
    };
  }

  private getFullDemoData(): DashboardData {
    const weekDays = this.generateWeekDays();
    const demoMeals = [
      [
        { title: "Avocado Toast", image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=400&h=300&fit=crop", cuisine: "Modern", difficulty: "Easy" as const },
        { title: "Caesar Salad", image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&h=300&fit=crop", cuisine: "Mediterranean", difficulty: "Easy" as const },
        { title: "Grilled Chicken", image: "https://images.unsplash.com/photo-1598515213692-d4eee2a31304?w=400&h=300&fit=crop", cuisine: "American", difficulty: "Medium" as const }
      ],
      [
        { title: "Greek Yogurt Bowl", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop", cuisine: "Mediterranean", difficulty: "Easy" as const },
        { title: "Quinoa Salad", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop", cuisine: "Modern", difficulty: "Easy" as const },
        { title: "Pasta Carbonara", image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop", cuisine: "Italian", difficulty: "Medium" as const }
      ],
      [
        { title: "Scrambled Eggs", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=300&fit=crop", cuisine: "American", difficulty: "Easy" as const },
        { title: "Caprese Sandwich", image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop", cuisine: "Italian", difficulty: "Easy" as const },
        { title: "Chicken Stir-fry", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop", cuisine: "Asian", difficulty: "Medium" as const }
      ],
      [
        { title: "Oatmeal", image: "https://images.unsplash.com/photo-1574168280036-9cc8bbc2e4d7?w=400&h=300&fit=crop", cuisine: "Modern", difficulty: "Easy" as const },
        { title: "Turkey Wrap", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop", cuisine: "American", difficulty: "Easy" as const },
        { title: "Salmon with Rice", image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop", cuisine: "Asian", difficulty: "Medium" as const }
      ],
      [
        { title: "Smoothie Bowl", image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300&fit=crop", cuisine: "Modern", difficulty: "Easy" as const },
        { title: "Chicken Salad", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop", cuisine: "American", difficulty: "Easy" as const },
        { title: "Beef Tacos", image: "https://images.unsplash.com/photo-1565299585323-38174c26dee0?w=400&h=300&fit=crop", cuisine: "Mexican", difficulty: "Medium" as const }
      ],
      [
        { title: "Pancakes", image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop", cuisine: "American", difficulty: "Medium" as const },
        { title: "Poke Bowl", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop", cuisine: "Hawaiian", difficulty: "Easy" as const },
        { title: "Pizza Margherita", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop", cuisine: "Italian", difficulty: "Hard" as const }
      ],
      [
        { title: "French Toast", image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&h=300&fit=crop", cuisine: "French", difficulty: "Medium" as const },
        { title: "Soup & Salad", image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400&h=300&fit=crop", cuisine: "Modern", difficulty: "Easy" as const },
        { title: "Roast Chicken", image: "https://images.unsplash.com/photo-1518492104633-130d0cc84637?w=400&h=300&fit=crop", cuisine: "American", difficulty: "Medium" as const }
      ]
    ];

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
          title: "Pickle onions for tomorrow",
          description: "For Wednesday's meal",
          time: "10 min",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          textColor: "text-green-800"
        }
      ],
      weekDays: weekDays.map((day, dayIndex) => ({
        ...day,
        actionItems: dayIndex === 0 ? ["Marinate chicken"] : dayIndex === 2 ? ["Pickle onions for tomorrow"] : dayIndex === 4 ? ["Slow cook beef"] : [],
        meals: [
          { id: `${dayIndex * 3 + 1}`, type: "breakfast" as const, ...demoMeals[dayIndex][0], dayId: day.id },
          { id: `${dayIndex * 3 + 2}`, type: "lunch" as const, ...demoMeals[dayIndex][1], dayId: day.id },
          { id: `${dayIndex * 3 + 3}`, type: "dinner" as const, ...demoMeals[dayIndex][2], dayId: day.id }
        ]
      })),
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
    // Find and replace the meal with a "skipped" placeholder
    for (const day of this.data.weekDays) {
      const mealIndex = day.meals.findIndex(meal => meal.id === mealId);
      if (mealIndex !== -1) {
        const originalMeal = day.meals[mealIndex];
        // Replace with skipped placeholder
        day.meals[mealIndex] = {
          id: mealId,
          type: originalMeal.type,
          title: "Meal skipped",
          image: "",
          cuisine: "",
          difficulty: "Easy" as const,
          dayId: day.id
        };
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
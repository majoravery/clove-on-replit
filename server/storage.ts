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
        name: i === 0 ? "Today" : i === 1 ? "Tomorrow" : dayName,
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
        { title: "Avocado Toast", image: "data:image/svg+xml;base64," + btoa(`<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f8f5f0"/><rect x="80" y="120" width="240" height="100" rx="20" fill="#8B4513"/><ellipse cx="200" cy="140" rx="80" ry="30" fill="#32CD32"/><circle cx="200" cy="140" r="8" fill="#FFD700"/></svg>`), cuisine: "Modern", difficulty: "Easy" as const },
        { title: "Caesar Salad", image: "data:image/svg+xml;base64," + btoa(`<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f8f5f0"/><ellipse cx="200" cy="150" rx="120" ry="80" fill="#90EE90"/><rect x="160" y="120" width="80" height="60" fill="#228B22" opacity="0.7"/><circle cx="150" cy="130" r="8" fill="#FFE4B5"/><circle cx="250" cy="170" r="8" fill="#FFE4B5"/></svg>`), cuisine: "Mediterranean", difficulty: "Easy" as const },
        { title: "Grilled Chicken", image: "data:image/svg+xml;base64," + btoa(`<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f8f5f0"/><ellipse cx="200" cy="150" rx="100" ry="60" fill="#D2691E"/><path d="M130 120 Q200 100 270 120 Q250 180 200 190 Q150 180 130 120" fill="#CD853F"/></svg>`), cuisine: "American", difficulty: "Medium" as const }
      ],
      [
        { title: "Greek Yogurt Bowl", image: "data:image/svg+xml;base64," + btoa(`<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f8f5f0"/><ellipse cx="200" cy="150" rx="80" ry="60" fill="#FFF8DC"/><circle cx="180" cy="130" r="12" fill="#FF69B4"/><circle cx="220" cy="170" r="10" fill="#4169E1"/><circle cx="200" cy="140" r="8" fill="#32CD32"/></svg>`), cuisine: "Mediterranean", difficulty: "Easy" as const },
        { title: "Quinoa Salad", image: "data:image/svg+xml;base64," + btoa(`<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f8f5f0"/><ellipse cx="200" cy="150" rx="110" ry="70" fill="#F5DEB3"/><circle cx="170" cy="130" r="4" fill="#8B4513"/><circle cx="210" cy="140" r="4" fill="#8B4513"/><circle cx="190" cy="170" r="4" fill="#8B4513"/><circle cx="180" cy="150" r="3" fill="#FF6347"/></svg>`), cuisine: "Modern", difficulty: "Easy" as const },
        { title: "Pasta Carbonara", image: "data:image/svg+xml;base64," + btoa(`<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f8f5f0"/><ellipse cx="200" cy="150" rx="120" ry="80" fill="#333"/><path d="M100 120 Q150 110 200 130 Q250 110 300 120" stroke="#FFD700" stroke-width="4" fill="none"/><path d="M110 140 Q160 130 210 150 Q260 130 290 140" stroke="#FFD700" stroke-width="4" fill="none"/></svg>`), cuisine: "Italian", difficulty: "Medium" as const }
      ],
      [
        { title: "Scrambled Eggs", image: "data:image/svg+xml;base64," + btoa(`<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f8f5f0"/><ellipse cx="200" cy="150" rx="120" ry="60" fill="#333"/><ellipse cx="180" cy="130" rx="40" ry="25" fill="#FFD700"/><ellipse cx="220" cy="170" rx="50" ry="30" fill="#FFD700"/></svg>`), cuisine: "American", difficulty: "Easy" as const },
        { title: "Caprese Sandwich", image: "data:image/svg+xml;base64," + btoa(`<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f8f5f0"/><rect x="120" y="100" width="160" height="100" fill="#DEB887"/><circle cx="160" cy="130" r="15" fill="#FF6347"/><circle cx="200" cy="150" r="15" fill="#FFF"/><circle cx="240" cy="170" r="15" fill="#32CD32"/></svg>`), cuisine: "Italian", difficulty: "Easy" as const },
        { title: "Chicken Stir-fry", image: "data:image/svg+xml;base64," + btoa(`<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f8f5f0"/><ellipse cx="200" cy="150" rx="120" ry="80" fill="#333"/><rect x="150" y="120" width="30" height="20" fill="#CD853F"/><rect x="200" y="140" width="25" height="25" fill="#32CD32"/></svg>`), cuisine: "Asian", difficulty: "Medium" as const }
      ],
      [
        { title: "Oatmeal", image: "data:image/svg+xml;base64," + btoa(`<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f8f5f0"/><ellipse cx="200" cy="150" rx="90" ry="60" fill="#F5DEB3"/><circle cx="180" cy="130" r="8" fill="#4169E1"/><circle cx="220" cy="170" r="6" fill="#FF69B4"/></svg>`), cuisine: "Modern", difficulty: "Easy" as const },
        { title: "Turkey Wrap", image: "data:image/svg+xml;base64," + btoa(`<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f8f5f0"/><ellipse cx="200" cy="150" rx="60" ry="100" fill="#DEB887"/><rect x="170" y="110" width="60" height="10" fill="#8B4513"/><rect x="175" y="130" width="50" height="8" fill="#32CD32"/></svg>`), cuisine: "American", difficulty: "Easy" as const },
        { title: "Salmon with Rice", image: "data:image/svg+xml;base64," + btoa(`<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f8f5f0"/><ellipse cx="200" cy="120" rx="80" ry="30" fill="#FFA07A"/><ellipse cx="200" cy="180" rx="100" ry="40" fill="#FFF8DC"/></svg>`), cuisine: "Asian", difficulty: "Medium" as const }
      ],
      [
        { title: "Smoothie Bowl", image: "data:image/svg+xml;base64," + btoa(`<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f8f5f0"/><ellipse cx="200" cy="150" rx="90" ry="60" fill="#DA70D6"/><circle cx="170" cy="130" r="10" fill="#FF69B4"/><circle cx="230" cy="170" r="8" fill="#32CD32"/><circle cx="200" cy="140" r="6" fill="#4169E1"/></svg>`), cuisine: "Modern", difficulty: "Easy" as const },
        { title: "Chicken Salad", image: "data:image/svg+xml;base64," + btoa(`<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f8f5f0"/><ellipse cx="200" cy="150" rx="110" ry="70" fill="#90EE90"/><rect x="170" y="130" width="25" height="15" fill="#CD853F"/><rect x="205" y="160" width="20" height="12" fill="#CD853F"/></svg>`), cuisine: "American", difficulty: "Easy" as const },
        { title: "Beef Tacos", image: "data:image/svg+xml;base64," + btoa(`<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f8f5f0"/><path d="M150 120 Q200 100 250 120 L250 180 Q200 200 150 180 Z" fill="#DEB887"/><rect x="170" y="130" width="60" height="8" fill="#8B4513"/><rect x="175" y="145" width="50" height="6" fill="#32CD32"/></svg>`), cuisine: "Mexican", difficulty: "Medium" as const }
      ],
      [
        { title: "Pancakes", image: "data:image/svg+xml;base64," + btoa(`<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f8f5f0"/><circle cx="200" cy="120" r="80" fill="#DEB887"/><circle cx="200" cy="140" r="75" fill="#F4A460"/><circle cx="200" cy="160" r="70" fill="#DEB887"/><rect x="180" y="100" width="40" height="8" fill="#FFD700"/></svg>`), cuisine: "American", difficulty: "Medium" as const },
        { title: "Poke Bowl", image: "data:image/svg+xml;base64," + btoa(`<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f8f5f0"/><ellipse cx="200" cy="150" rx="100" ry="70" fill="#FFF8DC"/><rect x="150" y="130" width="30" height="15" fill="#FFA07A"/><rect x="220" y="160" width="25" height="20" fill="#32CD32"/></svg>`), cuisine: "Hawaiian", difficulty: "Easy" as const },
        { title: "Pizza Margherita", image: "data:image/svg+xml;base64," + btoa(`<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f8f5f0"/><circle cx="200" cy="150" r="100" fill="#FF6347"/><circle cx="200" cy="150" r="80" fill="#FFD700"/><circle cx="180" cy="130" r="8" fill="#FFF"/><circle cx="220" cy="170" r="8" fill="#32CD32"/></svg>`), cuisine: "Italian", difficulty: "Hard" as const }
      ],
      [
        { title: "French Toast", image: "data:image/svg+xml;base64," + btoa(`<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f8f5f0"/><rect x="120" y="120" width="160" height="60" fill="#DEB887"/><rect x="130" y="130" width="140" height="40" fill="#F4A460"/><rect x="180" y="100" width="40" height="8" fill="#FFD700"/></svg>`), cuisine: "French", difficulty: "Medium" as const },
        { title: "Soup & Salad", image: "data:image/svg+xml;base64," + btoa(`<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f8f5f0"/><ellipse cx="160" cy="150" rx="50" ry="40" fill="#FF6347"/><ellipse cx="240" cy="150" rx="60" ry="50" fill="#90EE90"/></svg>`), cuisine: "Modern", difficulty: "Easy" as const },
        { title: "Roast Chicken", image: "data:image/svg+xml;base64," + btoa(`<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="#f8f5f0"/><ellipse cx="200" cy="150" rx="100" ry="60" fill="#D2691E"/><path d="M130 120 Q200 100 270 120 Q250 180 200 190 Q150 180 130 120" fill="#CD853F"/></svg>`), cuisine: "American", difficulty: "Medium" as const }
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
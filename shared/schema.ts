import { z } from "zod";

export const InventoryItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  quantity: z.string(),
  status: z.enum(["normal", "low", "critical"]),
  icon: z.string(),
});

export const TaskSchema = z.object({
  id: z.string(),
  type: z.enum(["prep", "shopping"]),
  title: z.string(),
  description: z.string(),
  time: z.string(),
  bgColor: z.string(),
  textColor: z.string(),
  borderColor: z.string(),
});

export const MealSchema = z.object({
  id: z.string(),
  title: z.string(),
  cuisine: z.string(),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  image: z.string(),
  type: z.enum(["breakfast", "lunch", "dinner"]),
  dayId: z.string(),
});

export const DaySchema = z.object({
  id: z.string(),
  name: z.string(),
  date: z.string(),
  isToday: z.boolean().default(false),
  actionItems: z.array(z.string()).default([]),
  meals: z.array(MealSchema).default([]),
});

export const DashboardDataSchema = z.object({
  inventory: z.array(InventoryItemSchema),
  tasks: z.array(TaskSchema),
  weekDays: z.array(DaySchema),
  regenerationsLeft: z.number().default(3),
});

export type InventoryItem = z.infer<typeof InventoryItemSchema>;
export type Task = z.infer<typeof TaskSchema>;
export type Meal = z.infer<typeof MealSchema>;
export type Day = z.infer<typeof DaySchema>;
export type DashboardData = z.infer<typeof DashboardDataSchema>;

export interface DragItem {
  id: string;
  type: string;
  mealType: string;
  dayId: string;
}

export interface DropResult {
  dayId?: string;
  mealType?: string;
}

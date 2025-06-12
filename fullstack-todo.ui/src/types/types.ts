export interface ITodoItem {
  id: number | null;
  itemTitle: string;
  itemDesc: string;
  completed: boolean;
  editingProp?: boolean;
}
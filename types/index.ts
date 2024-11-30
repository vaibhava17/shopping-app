export interface User {
  id: string;
  email: string;
}
export interface ShoppingItem {
  id: string;
  name: string;
  quantity: string;
  completed: boolean;
}

export interface ShoppingListState {
  items: ShoppingItem[];
}

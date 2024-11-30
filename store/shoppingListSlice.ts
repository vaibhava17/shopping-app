import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShoppingItem, ShoppingListState } from "../types";

const initialState: ShoppingListState = {
  items: [],
};

interface AddItemPayload {
  name: string;
  quantity: string;
}

const shoppingListSlice = createSlice({
  name: "shoppingList",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<AddItemPayload>) => {
      state.items.push({
        id: Date.now().toString(),
        name: action.payload.name,
        quantity: action.payload.quantity,
        completed: false,
      });
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.completed = !item.completed;
      }
    },
  },
});

export const { addItem, removeItem, toggleComplete } =
  shoppingListSlice.actions;
export default shoppingListSlice.reducer;

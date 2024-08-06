import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Plant {
  id: number;
  name: string;
  price: string;
  like: boolean;
  img: any;
  about: string;
}

interface CartItem {
  plant: Plant;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Plant>) => {
      const index = state.items.findIndex(item => item.plant.id === action.payload.id);
      if (index >= 0) {
        state.items[index].quantity += 1;
      } else {
        state.items.push({ plant: action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex(item => item.plant.id === action.payload);
      if (index >= 0) {
        state.items[index].quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const index = state.items.findIndex(item => item.plant.id === action.payload);
      if (index >= 0) {
        if (state.items[index].quantity > 1) {
          state.items[index].quantity -= 1;
        } else {
          state.items.splice(index, 1);
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.plant.id !== action.payload);
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getMyCart,
  updateCartItem,
  deleteCartItem,
} from "../../../pages/api/cart";

export const getCartThunk = createAsyncThunk("cart", async () => {
  let cart = (await getMyCart())?.data?.data?.cards ?? [];
  return cart;
});

export const updateCartItemThunk = createAsyncThunk(
  "cart/updateCartItem",
  async ({ id, quantity }) => {
    const response = await updateCartItem(id, JSON.stringify({ quantity }));
    return response;
  }
);

export const deleteCartItemThunk = createAsyncThunk(
  "cart/deleteCartItem",
  async (id) => {
    await deleteCartItem(id);
    return id;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    error: "",
    loader: false,
    totalPrice: 0,
  },
  reducers: {
    calculateTotal: (state) => {
      let totalPrice = 0;
      for (const item of state.cart) {
        totalPrice += item.price;
      }
      state.totalPrice = totalPrice;
    },
    updateData: (state, action) => {
      const updatedCartItems = state.cart.map((item) =>
        item._id === action?.payload?.id
          ? {
              ...item,
              quantity: action?.payload?.res?.data?.data?.card?.quantity,
              price: action?.payload?.res.data?.data?.card?.price,
            }
          : item
      );
      state.cart = updatedCartItems;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(getCartThunk.fulfilled, (state, action) => {
        // Add user to the state array
        state.cart = action.payload;
        state.loader = false;
      })
      .addCase(getCartThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getCartThunk.pending, (state, action) => {
        state.loader = true;
      })
      .addCase(updateCartItemThunk.fulfilled, (state, action) => {
        const updatedCartItem = action.payload.data.card;
        const index = state.cart.findIndex(
          (item) => item._id === updatedCartItem._id
        );
        if (index !== -1) {
          state.cart[index] = updatedCartItem;
          state.loader = false;
        }
      })
      .addCase(updateCartItemThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(deleteCartItemThunk.fulfilled, (state, action) => {
        const id = action.payload;
        state.cart = state.cart.filter((item) => item._id !== id);
        state.loader = false;
      })
      .addCase(deleteCartItemThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      });
  },
});
export const { calculateTotal, updateData } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategories } from "../../../pages/api/categories";

export const getCategoriesThunk = createAsyncThunk("categories", async () => {
  let categories = (await getCategories())?.data?.data?.data ?? [];
  return categories;
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    error: "",
    loader: false,
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(getCategoriesThunk.fulfilled, (state, action) => {
        // Add user to the state array
        state.categories = action.payload;
        state.loader = false;
      })
      .addCase(getCategoriesThunk.rejected, (state, action) => {
        state.error = action.payload;
        state.loader = false;
      })
      .addCase(getCategoriesThunk.pending, (state, action) => {
        state.loader = true;
      });
  },
});

export default categoriesSlice.reducer;

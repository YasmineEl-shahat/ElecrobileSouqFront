import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import categoriesReducer from "./reducers/categoriesSlice";
import cartReducer from "./reducers/cartSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    categories: categoriesReducer,
    cart: cartReducer,
  },
});

export const persistor = persistStore(store);

export default store;

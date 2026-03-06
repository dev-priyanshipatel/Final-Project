import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../features/auth/authSlice";
import categoryReducer from "../features/category/categorySlice";
import expenseReducer from "../features/expense/expenseSlice";


 export const store = configureStore({
   reducer: {
     auth: AuthReducer,
     category: categoryReducer,
     expense: expenseReducer
   },
 });
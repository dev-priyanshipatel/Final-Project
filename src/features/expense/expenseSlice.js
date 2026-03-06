import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../config/firebase/firebase.config";
import { deleteCategory } from "../category/categorySlice";

export const addExpense = createAsyncThunk("expense/addExpense", async (data) => {
    try {
      const docRef = await addDoc(collection(db, "expenses"), data);
      const expense = {
        id: docRef.id,
        ...data,
      };
      return expense;
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const fetchExpensesByUser = createAsyncThunk("expense/fetchExpensesByUser", async (uid) => {
    try {
      const q = query(collection(db, "expenses"), where("uid", "==", uid));
      const docSnapShot = await getDocs(q);
      const expenses = docSnapShot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate().toISOString(),
        };
      });
      return expenses;
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const deleteExpense = createAsyncThunk("expense/deleteExpense",async (id) => {
    try {
      await deleteDoc(doc(db, "expenses", id));
      return id;
    } catch (error) {
      console.log(error.message);
    }
  },
);

export const updateExpense = createAsyncThunk("expense/updateExpense", async ({id, data}) => {
  try {
    const docRef = doc(db, "expenses", id);
    await updateDoc(docRef, data);
    return { id, ...data};
  } catch (error) {
    console.log(error.message);
  }
});

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    list: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(addExpense.fulfilled, (state, action) => {
    //     state.list.push(action.payload);
    // })

    builder.addCase(fetchExpensesByUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchExpensesByUser.fulfilled, (state, action) => {
      state.list = action.payload;
    });

    builder.addCase(deleteExpense.fulfilled, (state, action) => {
      state.list = state.list.filter((item) => {
        return item.id !== action.payload;
      });
      state.isLoading = false;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      const deletedIds = action.payload.expenseIds;

      state.list = state.list.filter(
        (expense) => !deletedIds.includes(expense.id),
      );
    });
  },
});

export default expenseSlice.reducer;

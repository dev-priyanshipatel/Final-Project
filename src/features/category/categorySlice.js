import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../../config/firebase/firebase.config";

export const addCategory = createAsyncThunk('category/addCategory' , async ({name, uid, date}) => {
    try {
        const docRef = await addDoc(collection(db, "categories"), {
            name  , uid , date,  createdAt : new Date()
        })
        return {
            id : docRef.id,
            name : name,
            date : date,
            uid : uid
        }
    } catch (error) {
        console.log(error.message)
    }
})

export const fetchCategoryByUser = createAsyncThunk("category/fetchCategoryByUser", async (uid) => {
    try {
        const q = query(collection(db, "categories"), where ("uid" ,"==", uid ));
        const docSnapShot = await getDocs(q);
        const categories = docSnapShot.docs.map((doc) => {
            const data = doc.data();
            return {
                id : doc.id,
                ...data,
                createdAt : data.createdAt?.toDate().toISOString()
            }
        })
        
        return categories;
    } catch (error) {
        console.log(error.message)
    }
});

export const deleteCategory = createAsyncThunk("category/deleteCategory", async (id ) => {
    try {
        await deleteDoc(doc(db, "categories", id));
        return id;
    } catch (error) {
        console.log(error.message);
    }
});

export const updateCategory = createAsyncThunk("category/updateCategory", async ({name, date, id}) => {
    try {
        const docRef = doc(db, "categories", id);
        await updateDoc(docRef,{ name, date });
        return { id, name, date }
    } catch (error) {
        console.log(error.message);
    }
});

const categorySlice = createSlice({
    name : "category",
    initialState : {
        list : [],
        isLoading : false,
    },
    reducers :{},
    extraReducers : (builder) => {
        // builder.addCase(addCategory.fulfilled, (state, action) => {
        //     state.list.push(action.payload);
        // })

        builder.addCase(fetchCategoryByUser.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchCategoryByUser.fulfilled, (state, action) => {
            state.list = action.payload;
            state.isLoading = false; 
        })

        builder.addCase(deleteCategory.fulfilled, (state, action) => {
            state.list = state.list.filter((item) => {
                return item.id !== action.payload;
            })
            state.isLoading = false;
        })
    }
})

export default categorySlice.reducer;
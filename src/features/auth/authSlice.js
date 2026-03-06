import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../../firebase/firebase.config";

export const signup = createAsyncThunk('auth/signup', async ({email, password, name}) => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const { uid } = userCredentials.user;
        const userEmail = userCredentials.user.email;

        const ref = doc(db, "users", uid);
        const snap = await getDoc(ref);

        if(!snap.exists()){
            const data = await setDoc(ref, {
                name, email : userEmail, createdAt: new Date()
            })
        }
        // userCredentials.user.displayName = name;
        const user = userCredentials.user;

        const userData = {
            name : name,
            email : user.email,
            uid : user.uid
        }

        return userData;
    } catch (error) {
        console.log(error.message);
    }
})

export const login = createAsyncThunk('auth/login', async ({email, password}) => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;

        const userData = {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
        };

        return userData;
    } catch (error) {
        console.log(error.message);
    }
})

export const googleSignin = createAsyncThunk('auth/googleSignin', async () => {
    try {
        const userCredentials = await signInWithPopup(auth, googleProvider);
        const { uid ,email} = userCredentials.user;

        const ref = doc(db, "users", uid);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          const data = await setDoc(ref, {
            name: userCredentials.user.displayName,
            email,
            createdAt: new Date(),
          });
        }
        
        const user = userCredentials.user;

        const userData = {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          profileURL : user.photoURL
        };

        return userData;
    } catch (error) {
        console.log(error.message);
    }
})
const authSlice = createSlice({
    name : 'auth',
    initialState : {
        user : null,
        isLoading : false,
        error : null
    },
    reducers :{
        setUser : (state, action) => {
            state.user = action.payload
        }
    },
    extraReducers : (builder) => {
        builder.addCase(signup.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(signup.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false
        })

        builder.addCase(login.pending, (state, action) => {
          state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        })

        builder.addCase(googleSignin.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(googleSignin.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        })
    }
})

export const {setUser } = authSlice.actions
export default authSlice.reducer
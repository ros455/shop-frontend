import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import axios from '../axios.js';

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const {data} = await axios.post('/registration',params);
    return data
})

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const {data} = await axios.post('/login',params);
    return data
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const {data} = await axios.get('/get-me');
    return data
})

export const fetchIsAdmin = createAsyncThunk('auth/fetchIsAdmin', async () => {
    const {data} = await axios.get('/get-me');
    return data.isadmin
})

export const fetchAllUser = createAsyncThunk( 'auth/fetchAllUser',async() => {
    const {data} = await axios.get('/get-all-user');
    return data
})



const initialState = {
    data: null,
    user: null,
    users: null,
    isAdmin: false,
    status: 'loading',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
        }
    },
    extraReducers: {
        [fetchRegister.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchRegister.fulfilled]: (state,action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchRegister.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchAuth.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuth.fulfilled]: (state,action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuth.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchAuthMe.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuthMe.fulfilled]: (state,action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuthMe.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchIsAdmin.pending]: (state) => {
            state.status = 'loading';
            state.isAdmin = false;
        },
        [fetchIsAdmin.fulfilled]: (state,action) => {
            state.status = 'loaded';
            state.isAdmin = action.payload;
        },
        [fetchIsAdmin.rejected]: (state) => {
            state.status = 'error';
            state.isAdmin = false;
        },
        [fetchAllUser.pending]: (state) => {
            state.status = 'loading';
            state.users = null;
        },
        [fetchAllUser.fulfilled]: (state,action) => {
            state.status = 'loaded';
            state.users = action.payload;
        },
        [fetchAllUser.rejected]: (state) => {
            state.status = 'error';
            state.users = null;
        },
    }
})

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const currentUser = ((state) => state.auth.data);

export const allUsers = ((state) => state.auth.users)

export const selectIsAdmin = ((state) => state.auth.isAdmin)

export const authReducer = authSlice.reducer;

export const {logout} = authSlice.actions;
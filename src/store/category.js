import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../axios.js';

export const fetchCategory = createAsyncThunk('get-all-categories/fetchCategory', async() => {
    const {data} = await axios.get('/get-all-categories');

    return data
})

export const fetchRemoveCategory = createAsyncThunk('category/fetchRemoveCategory', async(id) => {

    axios.delete(`/remove-categories/${id}`);
})


const categorySlice = createSlice({
    name: 'category',
    initialState: {
        category: {
            items: [],
            status: 'loading',
        }
    },
    extraReducers: {
        [fetchCategory.pending]: (state) => {
            state.category.items = [];
            state.category.status = 'loading';
        },
        [fetchCategory.fulfilled]: (state,action) => {
            state.category.items = action.payload;
            state.category.status = 'loaded';
        },
        [fetchCategory.rejected]: (state) => {
            state.category.items = [];
            state.category.status = 'error';
        },
        [fetchRemoveCategory.pending]: (state, action) => {
            state.category.items = state.category.items.filter(obj => obj._id !== action.meta.arg)
        },
    }
})

export const categoryReducer = categorySlice.reducer;
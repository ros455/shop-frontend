import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../axios.js';

export const fetchAllOrders = createAsyncThunk( 'order/fetchAllOrders',async() => {
    const {data} = await axios.get('/get-all-orders');
    return data
})
export const fetchRemoveOrders = createAsyncThunk('order/fetchRemoveOrders', async(id) => {
    axios.delete(`/admin-orders/${id}`);
})

const initialState ={
    order: [],
    status: 'loading',
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchAllOrders.pending]: (state) => {
            state.status = 'loading';
            state.order = null;
        },
        [fetchAllOrders.fulfilled]: (state,action) => {
            state.status = 'loaded';
            state.order = action.payload;
        },
        [fetchAllOrders.rejected]: (state) => {
            state.status = 'error';
            state.order = null;
        },
        [fetchRemoveOrders.pending]: (state, action) => {
            state.order = state.order.filter(obj => obj._id !== action.meta.arg)
        },
    }
})

export const selectOrders = ((state) => state.order.order)

export const ordersReducer = orderSlice.reducer;
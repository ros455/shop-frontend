import { createSlice, createAsyncThunk, current  } from "@reduxjs/toolkit";
import axios from '../axios.js';

export const fetchAllProducts = createAsyncThunk( 'product/fetchAllProducts',async() => {
    const {data} = await axios.get('/get-all-products');
    return data
})
export const fetchRemoveProducts = createAsyncThunk('product/fetchRemoveProducts', async(id) => {
    axios.delete(`/products/${id}`);
})

const initialState ={
    product: [],
    productCaneg: [],
    productMiddle: [],
    status: 'loading',
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        currentCategory (state,action) {
            let arr = [];

            state.product.forEach((el) => {
                if(el.category == action.payload) {
                    arr.push(el)
                }
              })
            state.productCaneg = [];
            state.productCaneg = [...arr]
            state.productMiddle = [...arr]
        },
        allCategory (state,action) {
            state.productCaneg  = [...state.product]
        },
        searchProduct (state,action) {
            let array = state.product.filter((item) => 
                item.title.toLowerCase().includes(action.payload.toLowerCase())
            )
            state.productCaneg = [...array]
        },
        sortDefault (state) {
            if(state.productMiddle.length != 0 ) {
                state.productCaneg = [...state.productMiddle]
            } else {
                state.productCaneg = [...state.product]
            }
        },
        sortCheap(state) {
            state.productCaneg.sort((first, second) => {
                if(first.price < second.price) {
                    return -1
                } else if (first.price == second.price) {
                    return 0;
                } else if (first.price > second.price) {
                    return 1
                }
            })
        },
        sortExpensive (state) {
            state.productCaneg.sort((first, second) => {
                if(first.price > second.price) {
                    return -1
                } else if (first.price == second.price) {
                    return 0;
                } else if (first.price > second.price) {
                    return 1
                }
            })
        }
    },
    extraReducers: {
        [fetchAllProducts.pending]: (state) => {
            state.status = 'loading';
            state.product = null;
        },
        [fetchAllProducts.fulfilled]: (state,action) => {
            state.status = 'loaded';
            state.product = action.payload;
            state.productCaneg = action.payload;
        },
        [fetchAllProducts.rejected]: (state) => {
            state.status = 'error';
            state.product = null;
        },
        [fetchRemoveProducts.pending]: (state, action) => {
            state.product = state.product.filter(obj => obj._id !== action.meta.arg)
        },
    }
})

export const {currentCategory,allCategory,searchProduct,sortDefault,sortCheap,sortExpensive} = productSlice.actions;

export const selectProducts = ((state) => state.product.product)

export const selectProductChange = ((state) => state.product.productCaneg)

export const productsReducer = productSlice.reducer;
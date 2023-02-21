import { createSlice } from "@reduxjs/toolkit";

export const productPageSlice = createSlice({
    name: 'productOnPage',
    initialState: {
        value: 5,
        currentPage: 1,
    },
    reducers: {
        changeProductOnPage (state, action) {
            state.value = action.payload
        },
        setCurrentPage (state, action) {
            state.currentPage = action.payload
        }
    }
})

export const {changeProductOnPage,setCurrentPage} = productPageSlice.actions;

export const selectProductOnPage = state => state.productOnPage.value;

export const selectCurrentPage = state => state.productOnPage.currentPage;

export const productPageReducer = productPageSlice.reducer;
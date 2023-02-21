import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        total: 0,
    },
    reducers: {
        removeCart (state, actions) {
            state.items = state.items.filter(item => item._id !== actions.payload)
        },

        removeAll (state) {
            state.items = [];
        },

        addCart (state,actions) {
            state.items.push(actions.payload)
        },

        incrementCart (state, actions) {
            state.items.map((el) => {
                if(el._id == actions.payload) {
                    el.count++
                }
            })
        },

        decrementCart (state, actions) {
            state.items.map((el) => {
                if(el._id == actions.payload) {
                    el.count--
                    if(el.count < 1) {
                        state.items = state.items.filter(item => item._id !== actions.payload)
                    }
                }
            })
        },

        totalSum (state) {
            state.items.map((el) => {
                state.total += el.price * el. count;
            })
        }
    }
})

export const {addCart, incrementCart, decrementCart, removeCart, removeAll, totalSum } = cartSlice.actions;

export const selectCart = state => state.cart.items;

export const selectCartTotal = state => state.cart.items;

export const cartReducer = cartSlice.reducer; 

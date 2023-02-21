import { configureStore } from "@reduxjs/toolkit";
import { categoryReducer } from "./category";
import { authReducer } from "./auth";
import { productsReducer } from "./product";
import { cartReducer } from "./cart";
import { ordersReducer } from "./order";
import { productPageReducer } from "./productOnPage";
import { nowaReducer } from "./nowaPost";

export default configureStore({
    reducer: {
        category: categoryReducer,
        auth: authReducer,  
        product: productsReducer,
        cart: cartReducer,
        order: ordersReducer,
        productOnPage: productPageReducer,
        nowa: nowaReducer,
    }
})
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAuthMe,
  fetchIsAdmin,
  selectIsAdmin,
  fetchAllUser,
} from "./store/auth";
import { fetchAllProducts } from "./store/product";
import { selectCart } from "./store/cart";
import Spiner from "./Components/Spiner/Spiner";

import FirstRequest from "./Components/FirstRequest/FirstRequest";
import HeaderBottom from "./Components/HeaderBottom/HeaderBottom";
import HeaderMiddle from "./Components/HeaderMiddle/HeaderMiddle";
import HeaderTop from "./Components/HeaderTop/HeaderTop";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import Home from "./Components/Home/Home";
import AddProduct from "./Pages/Admin/AddProduct/AddProduct.js";
import FullAdminOrder from "./Pages/Admin/FullAdminOrder/FullAdminOrder";
import AdminEditCategory from "./Pages/Admin/AdminEditCategory/AdminEditCategory";

const Cart = React.lazy(() => import("./Pages/Cart/Cart.js"));
const FullProduct = React.lazy(() =>
  import("./Components/FullProduct/FullProduct")
);
const AboutUs = React.lazy(() => import("./Pages/AboutUs/AboutUs.js"));
const PayAndDelivery = React.lazy(() =>
  import("./Pages/PayAndDelivery/PayAndDelivery.js")
);
const ExchangeAndReturn = React.lazy(() =>
  import("./Pages/ExchangeAndReturn/ExchangeAndReturn.js")
);
const Contacts = React.lazy(() => import("./Pages/Contacts/Contacts.js"));
const PageUser = React.lazy(() => import("./Pages/PageUser/PageUser"));
const AdminOrders = React.lazy(() =>
  import("./Pages/Admin/AdminOrders/AdminOrders.js")
);
const AdminProducts = React.lazy(() =>
  import("./Pages/Admin/AdminProducts/AdminProducts.js")
);
const AdminCategories = React.lazy(() =>
  import("./Pages/Admin/AdminCategories/AdminCategories.js")
);
const AdminUsers = React.lazy(() =>
  import("./Pages/Admin/AdminUsers/AdminUsers.js")
);

function App() {
  const [cartLength, setCartLength] = React.useState(0);

  const isAdmin = useSelector(selectIsAdmin);

  const cart = useSelector(selectCart);

  React.useEffect(() => {
    setCartLength(cart.length);
  }, [cart.length]);

  return (
    <div className="App">
      <FirstRequest/>
      <HeaderTop cartLength={cartLength}/>
      <HeaderMiddle cartLength={cartLength} />
      <HeaderBottom/>

      {isAdmin && <AdminPanel />}

      <div className="all-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<h1>Path not resolved</h1>} />
          <Route
            path="about-us"
            element={
              <React.Suspense fallback={<Spiner/>}>
                <AboutUs />
              </React.Suspense>
            }
          />
          <Route
            path="pay-and-delivery"
            element={
              <React.Suspense fallback={<Spiner/>}>
                <PayAndDelivery />
              </React.Suspense>
            }
          />
          <Route
            path="exchange-and-return"
            element={
              <React.Suspense fallback={<Spiner/>}>
                <ExchangeAndReturn />
              </React.Suspense>
            }
          />
          <Route
            path="contacts"
            element={
              <React.Suspense fallback={<Spiner/>}>
                <Contacts />
              </React.Suspense>
            }
          />
          {isAdmin && (
            <Route
              path="admin-orders"
              element={
                <React.Suspense fallback={<Spiner/>}>
                  <AdminOrders />
                </React.Suspense>
              }
            />
          )}
          {isAdmin && (
            <Route
              path="admin-products"
              element={
                <React.Suspense fallback={<Spiner/>}>
                  <AdminProducts />
                </React.Suspense>
              }
            />
          )}
          {isAdmin && (
            <Route
              path="admin-categories"
              element={
                <React.Suspense fallback={<Spiner/>}>
                  <AdminCategories />
                </React.Suspense>
              }
            />
          )}
          {isAdmin && (
            <Route
              path="admin-users"
              element={
                <React.Suspense fallback={<Spiner/>}>
                  <AdminUsers />
                </React.Suspense>
              }
            />
          )}
          <Route
            path="cart"
            element={
              <React.Suspense fallback={<Spiner/>}>
                <Cart />
              </React.Suspense>
            }
          />
          <Route
            path="page-user"
            element={
              <React.Suspense fallback={<Spiner/>}>
                <PageUser />
              </React.Suspense>
            }
          />
          {isAdmin && (
            <Route path="admin-products/add-product" element={<AddProduct />} />
          )}
          <Route
            path="product/:id"
            element={
              <React.Suspense fallback={<Spiner/>}>
                <FullProduct />
              </React.Suspense>
            }
          />
          <Route path="product/:id/edit" element={<AddProduct />} />
          <Route path="admin-orders/:id" element={<FullAdminOrder />} />
          {isAdmin && (
            <Route
              path="admin-categories/:id/edit"
              element={<AdminEditCategory />}
            />
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;

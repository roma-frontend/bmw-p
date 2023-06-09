import { BrowserRouter, Route } from "react-router-dom";
import Home from "./components/home/Home";
import * as React from "react";
import MainLayout from "./layout/MainLayout";
import Products from "./components/products/Products";
import Product from "./components/products/product/Product";
import Register from "./pages/register/Register";
import RequireGuest from "./middlewares/requireGuest";
import Login from "./pages/login/Login";
import UserLoader from "./middlewares/user";
import ScrollToTop from "./utils/ScrollToTop";
import Contacts from "./components/contacts/Contacts";

const LazyPreview = React.lazy(() => import("./components/home/preview/Preview"));
const LazyFavoriteProducts = React.lazy(() => import("./components/products/favorites/FavoriteProducts"));
const LazyCreateProduct = React.lazy(() => import("./components/products/createProduct/CreateProduct"));

const AppRoutes = () => {
  return (
    <UserLoader>
      <ScrollToTop />
      <MainLayout>
        <Route exact path="/" component={Home} />
        <Route
          path="/preview"
          render={() => (
            <React.Suspense fallback={<div>Loading...</div>}>
              <LazyPreview />
            </React.Suspense>
          )}
        />
        <Route path="/products" component={Products} />
        <Route path="/products/:id" component={Product} />
        <Route
          path="/favorite-products"
          render={() => (
            <React.Suspense fallback={<div>Loading...</div>}>
              <LazyFavoriteProducts />
            </React.Suspense>
          )}
        />
        <Route
          path="/create-product"
          render={() => (
            <React.Suspense fallback={<div>Loading...</div>}>
              <LazyCreateProduct />
            </React.Suspense>
          )}
        />
        <Route
          path="/login"
          render={() => (
            <RequireGuest>
              <Login />
            </RequireGuest>
          )}
        />
        <Route
          path="/register"
          render={() => (
            <RequireGuest>
              <Register />
            </RequireGuest>
          )}
        />
        <Route path="/contacts" component={Contacts} />
      </MainLayout>
    </UserLoader>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
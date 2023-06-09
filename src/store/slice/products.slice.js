import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    favoriteProducts: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.map(product => ({...product, is_favorite: false}));
    },
    updateProduct: (state, action) => {
      const products = [...state.products];

      const { id, key, value } = action.payload;
      const product = products.find(product => product.id === id);
      const productIndex = products.findIndex(product => product.id === id);
      product[key] = value;

      products.splice(productIndex, 1, product);
      state.products = products;
    },
    deleteProduct: (state, action) => {
      const products = [...state.products];
      const productIndex = products.findIndex(product => product.id === action.payload);
      products.splice(productIndex, 1);
      state.products = products;
    },
    addFavoriteProduct: (state, action) => {
      const product = state.products.find(product => product.id === action.payload.id);
      if (product && product.is_favorite) {
        const index = state.favoriteProducts.findIndex((favorite) => favorite.id === action.payload.id);
        if (index === -1) {
          state.favoriteProducts.push(action.payload);
        }
      }
    },
    removeFavoriteProduct: (state, action) => {
      const product = state.products.find(product => product.id === action.payload);
      if (product && product.is_favorite) {
        state.favoriteProducts = state.favoriteProducts.filter((favorite) => favorite.id !== action.payload);
      }
    },
  },
});

export const { setProducts, updateProduct, deleteProduct, addFavoriteProduct, removeFavoriteProduct } = productsSlice.actions;

export default productsSlice.reducer;
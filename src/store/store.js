import { configureStore } from '@reduxjs/toolkit';
import { createAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import globalSlice from "./slice/global.slice";
import authSlice from './slice/auth.slice'
import productsSlice from './slice/products.slice';
import buttonSlice from './slice/name.slice'
import activeSlice from './slice/active.slice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['products', ['product']], 
};

const rootReducer = combineReducers({
  global: globalSlice,
  auth: authSlice,
  products: productsSlice,
  button: buttonSlice,
  active: activeSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const myAction = createAction('myAction');

export const persistor = persistStore(store);

export default store;
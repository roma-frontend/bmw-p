import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productsReducer from './products.slice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['products', ['product']],
};

export const REGISTER = 'REGISTER';

export function register(key) {
  return {
    type: REGISTER,
    key: key.toString(),
  };
}

const rootReducer = combineReducers({
  products: productsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
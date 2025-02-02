import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localstorage

import cartReducer from './cart/cart.reducer';
import userReducer from './user/user.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

// whitelist: which do you want to persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'] 
}

const rootReducer =  combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

// persist version reducer
export default persistReducer(persistConfig, rootReducer);
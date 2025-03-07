import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import orderSlice from './slices/orderSlice'
import whatsappModalSlice from './slices/whatsappModalSlice'


const rootReducer = combineReducers({
  cart : cartReducer,
  user : userReducer,
  order : orderSlice,
  whatsApp : whatsappModalSlice
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

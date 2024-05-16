import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import userSlice from './user/userSlice'
import appSlice from './app/appSlice';
import productSlice from './product/productSlice';

const commonConfig = {
    key: 'user',
    storage
}

const userConfig = {
    ...commonConfig,
    whitelist: ['isLoggedIn', 'currentUser', 'token'],
}

export const store = configureStore({
    reducer: {
        app: appSlice,
        user: persistReducer(userConfig, userSlice),
        product: productSlice
    }
});

export const persistor = persistStore(store)
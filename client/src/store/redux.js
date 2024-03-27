import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { userSlice } from './user/userSlice'

const commonConfig = {
    key: 'user',
    storage
}

const userConfig = {
    ...commonConfig,
    whitelist: ['isLoggedIn', 'token'],
}
const persistedUserReducer = persistReducer(userConfig, userSlice.reducer);

export const store = configureStore({
    reducer: {
        user: persistedUserReducer
    }
});

export const persistor = persistStore(store)
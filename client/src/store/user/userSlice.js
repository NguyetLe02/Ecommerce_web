import { createSlice } from '@reduxjs/toolkit'
import * as actions from './asyncActions'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        currentUser: null,
        token: null,
        isLoading: false,
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.token = action.payload.token
            state.currentUser = action.payload.currentUser
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.currentUser = null;
            state.token = null;
            state.isLoading = false;
        },

    },
    extraReducers: (builder) => {
        builder.addCase(actions.getCurrent.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
        });
        builder.addCase(actions.getCurrent.rejected, (state, action) => {
            state.isLoading = false;
            state.currentUser = null;
        });
    }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer

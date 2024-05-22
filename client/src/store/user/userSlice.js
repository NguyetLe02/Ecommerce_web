import { createSlice } from '@reduxjs/toolkit'
import * as actions from './asyncActions'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        currentUser: null,
        token: null,
        isLoading: false,
        currentCart: []
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
        updateCart: (state, action) => {
            const { pid, quantity, size } = action.payload
            const updatingCart = JSON.parse(JSON.stringify(state.currentCart))
            console.log([...updatingCart])
            const updateCart = updatingCart.map(el => {
                if (el.size === size && el.product?._id === pid) return { ...el, quantity }
                else return el
            })
            state.currentCart = updateCart
        }

    },
    extraReducers: (builder) => {
        builder.addCase(actions.getCurrent.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
            state.isLoggedIn = true
            state.currentCart = action.payload.cart
        });
        builder.addCase(actions.getCurrent.rejected, (state, action) => {
            state.isLoading = false;
            state.currentUser = null;
        });
    }
})

export const { login, logout, updateCart } = userSlice.actions

export default userSlice.reducer

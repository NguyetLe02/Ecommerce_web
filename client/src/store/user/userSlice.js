import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        currentUser: null,
        token: null
    },
    reducers: {
        register: (state, action) => {
            console.log(action);
            state.isLoggedIn = action.payload.isLoggedIn
            state.currentUser = action.payload.currentUser
            state.token = action.payload.token
        }
    }
})

export const { register } = userSlice.actions

export default userSlice.reducer

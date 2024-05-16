// import { createSlice } from '@reduxjs/toolkit'
// import * as actions from './asyncActions'

// export const productSlice = createSlice({
//     name: 'product',
//     initialState: {
//         isLoggedIn: false,
//         currentproduct: null,
//         token: null,
//         isLoading: false,
//     },
//     reducers: {
//         login: (state, action) => {
//             state.isLoggedIn = action.payload.isLoggedIn
//             state.token = action.payload.token
//             state.currentproduct = action.payload.currentproduct
//         },
//         logout: (state) => {
//             state.isLoggedIn = false;
//             state.currentproduct = null;
//             state.token = null;
//             state.isLoading = false;
//         },
//         updateCart: (state) => {

//         }

//     },
//     extraReducers: (builder) => {
//         builder.addCase(actions.getCurrent.pending, (state) => {
//             state.isLoading = true;
//         });
//         builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
//             state.isLoading = false;
//             state.currentproduct = action.payload;
//         });
//         builder.addCase(actions.getCurrent.rejected, (state, action) => {
//             state.isLoading = false;
//             state.currentproduct = null;
//         });
//     }
// })

// export const { login, logout } = productSlice.actions

// export default productSlice.reducer

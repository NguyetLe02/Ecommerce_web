import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../../apis'

export const getCategories = createAsyncThunk('app/categories', async (data, { rejectWithValue }) => {
    const response = await apis.apiGetProductCategories()
    if (!response.success) return rejectWithValue(response)
    console.log(response)
    return response.productCategories
})
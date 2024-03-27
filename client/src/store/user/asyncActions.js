import { createAsyncThunk } from '@reduxjs/toolkit'
import * as apis from '../../apis'

export const getCurrent = createAsyncThunk('user/current', async (data, { rejectWithValue }) => {
    const response = await apis.apiCurrent()
    if (!response.success) return rejectWithValue(response)
    return response.rs
})
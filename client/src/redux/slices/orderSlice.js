import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const orderSlice = createSlice({
  initialState: {
    CancelOrders: [],
    FillOrders: [],
    AllOrders: []
  },
  reducers: {
    setCancelOrders(state, action) {
      state.CancelOrders = action.payload
    },
    setFillOrders(state, action) {
      state.FillOrders = action.payload
    },
    setAllOrders(state, action) {
      state.AllOrders = action.payload
    }
  }
})
export const {
  setCancelOrders,
  setFillOrders,
  setAllOrders,
} = orderSlice.actions

export default orderSlice.reducer

export const loadCancelOrders = createAsyncThunk(
  'order/fetchCancelOrders',
  async (data, { dispatch }) => {
    dispatch(setCancelOrders([]))
  }
)

export const loadAllOrders = createAsyncThunk(
  'order/fetchAllOrders',
  async (data, { dispatch }) => {
    dispatch(setAllOrders([]))
  }
)


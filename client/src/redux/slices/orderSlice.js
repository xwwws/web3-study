import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const orderSlice = createSlice({
  name: 'order',
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

export const loadAllOrders = createAsyncThunk(
  'order/fetchAllOrders',
  async (data, { dispatch }) => {
    const { contract: { Exchange } } = data
    const orders = await Exchange.getPastEvents('Order',{
      fromBlock: 0,
      toBlock: "latest"
    })
    dispatch(setAllOrders(orders.map(order => {
      const {returnValues} = order
      return returnValues
    })))
  }
)

export const loadCancelOrders = createAsyncThunk(
  'order/fetchAllOrders',
  async (data, { dispatch }) => {
    const { contract: { Exchange } } = data
    const orders = await Exchange.getPastEvents('Cancel',{
      fromBlock: 0,
      toBlock: "latest"
    })
    dispatch(setCancelOrders(orders.map(order => {
      const {returnValues} = order
      return returnValues
    })))
  }
)

export const loadFillOrders = createAsyncThunk(
  'order/fetchAllOrders',
  async (data, { dispatch }) => {
    const { contract: { Exchange } } = data
    const orders = await Exchange.getPastEvents('Trade',{
      fromBlock: 0,
      toBlock: "latest"
    })
    dispatch(setFillOrders(orders.map(order => {
      const {returnValues} = order
      return returnValues
    })))
  }
)



import { createSlice } from '@reduxjs/toolkit'


const balanceSlice = createSlice({
  name: 'balance',
  initialState: {
    accountsAsset: []
  },
  reducers: {
    setAccountsAsset(state, action) {
      console.log(state,action)
      state.accountsAsset = action.payload
    }
  }
})
export const { setAccountsAsset } = balanceSlice.actions
export default balanceSlice.reducer;
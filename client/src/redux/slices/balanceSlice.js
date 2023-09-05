import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ETH_ADDRESS, fromWei } from "../../utils/utils";


const balanceSlice = createSlice({
  name: 'balance',
  initialState: {
    accountsAsset: []
  },
  reducers: {
    setAccountsAsset(state, action) {
      console.log(state, action)
      state.accountsAsset = action.payload
    }
  }
})
export const { setAccountsAsset } = balanceSlice.actions
export default balanceSlice.reducer;

export const loadBalanceData = createAsyncThunk(
  'balance/fetchBalanceData',
  async (state, { dispatch }) => {
    const  {
      web3,
      accounts,
      contract: { BDTToken, Exchange }
    } = state
    const users = []
    for (const userAddress of accounts) {
      users.push({
        userAddress,
        ETH: fromWei(await web3?.eth.getBalance(userAddress)),
        BDT: fromWei(await BDTToken.methods.balanceOf(userAddress).call()),
        exchangeBDT: fromWei(await Exchange.methods.balanceOf(BDTToken.options.address, userAddress).call()),
        exchangeETH: fromWei(await Exchange.methods.balanceOf(ETH_ADDRESS, userAddress).call())
      })
    }
    dispatch(setAccountsAsset(users))
  }
)
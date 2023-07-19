import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: 'light',
  user: null,
  token: null,
  product: [],
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
    setLogin: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
    },
    setLogout: (state) => {
      (state.user = null), (state.token = null)
    },
    setCart: (state, action) => {
      state.user.cart = action.payload.cart
    },
    setOrders: (state, action) => {
      console.log(action.payload.orders)
      state.user.orders = action.payload.orders
    },
    setWishlist: (state, action) => {
    
      state.user.wishList = action.payload.wishList
    },
    setAddress: (state, action) => {
    
      state.user.shippingAddress = action.payload.address
    },
    
  },
})
export const { setCart, setLogin, setLogout, setMode,setOrders,setWishlist,setAddress } = authSlice.actions
export default authSlice.reducer

import { useDispatch, useSelector } from 'react-redux'
import { setCart, setWishlist } from '../../state/slice'
import { Heart, Trash } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import React from 'react'

export const CartCard = (props) => {
  const productId = props.productId
  const {size,quantity}=props
  const user = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const dispatch = useDispatch()
  const product=props.product
  const available=(product && product.inStock? product?.inStock[size]>=quantity : false) && quantity!==0
  const wishlist = user?.wishList || []
  const inWishlist = wishlist.some((item) => item === product._id)
  const navigate = useNavigate()
  const handleRemoveFromCart = async (e) => {
    try {
      const response = await fetch(
        `http://localhost:3001/user/Cart/remove/${user._id}/${product._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const cart = await response.json()
      dispatch(setCart({cart:cart}))
      props.onRemoveFromCart(productId)
    } catch (error) {
      console.log(error)
    }
  }
  const handleOnClick = () => {
    navigate(`/product/${productId}`)
  }
  const handleAddToWishlist = async (e) => {
    
    try {
      const response = await fetch(
        `http://localhost:3001/user/wishlist/${user._id}/${product._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const wishlist = await response.json()
      dispatch(setWishlist({ wishList: wishlist }))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <li
      key={product.id}
      className={`flex flex-col py-6 sm:flex-row sm:justify-between px-4 overflow-hidden ${
        !available ? 'opacity-60' : ''
      }`}
    >
      <div className="flex w-full space-x-2 sm:space-x-4">
        <img
          className="h-20 w-20 flex-shrink-0 rounded object-scale-down outline-none dark:border-transparent sm:h-32 sm:w-32 cursor-pointer  "
          src={
            product.images && product.images.length > 0
              ? product.images[0]
              : '/icon.png'
          }
          onClick={handleOnClick}
          alt={product.name}
        />
        <div className="flex w-[100%] flex-col justify-between pb-4">
          <div className="flex w-full justify-between space-x-2 pb-2">
            <div className="space-y-1">
              <h3
                className="text-lg  leading-snug sm:pr-8 h-[1.75rem]  overflow-hidden text-gray-700 cursor-pointer"
                onClick={handleOnClick}
              >
                {product.name}
              </h3>
              <div className="flex ">
                <p className="text-sm text-gray-500 pr-1 border-r pb-2 cursor-default">
                  {size?.toUpperCase()}
                </p>
                <p className="text-sm px-1 text-gray-500 pb-2 cursor-default">
                  Qty : {quantity}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg text-gray-700 h-[1.75rem]">
                &#8377;{product.price}
              </p>
            </div>
          </div>
          {!available && (
            <div className="text-red-700 cursor-default">Out of stock</div>
          )}
          <div className="flex divide-x text-sm">
            <button
              type="button"
              className="flex items-center space-x-2 px-2 py-1 pl-0"
              onClick={handleRemoveFromCart}
            >
              <Trash size={16} />
              <span>Remove</span>
            </button>
            <button
              type="button"
              className="flex items-center space-x-2 px-2 py-1"
              onClick={handleAddToWishlist}
            >
              <Heart
                size={16}
                className={inWishlist ? 'text-red-500' : ''}
                style={{ fill: inWishlist ? 'red' : '' }}
              />
              <span>
                {inWishlist === false
                  ? 'Add to Favorites'
                  : 'Remove from Favorites'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}

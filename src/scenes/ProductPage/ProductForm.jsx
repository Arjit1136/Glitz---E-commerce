import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCart, setWishlist } from '../../state/slice'
import { useNavigate } from 'react-router-dom'

const ProductForm = ({ product }) => {
  const [size, setSize] = useState('s')
  const [quantity, setQuantity] = useState(1)
  const [clickedButton, setClickedButton] = useState('S')
  const [options, setOptions] = useState([])
  const { name,price } = product
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const wishlist = user?.wishList || []
  const inWishlist = wishlist.some((item) => item === product._id)
  const [inCart, setInCart] = useState(false)

  useEffect(() => {
    const cart = user?.cart || []
    
    const inCart = cart.some(
      (item) =>
        item.productId === product._id &&
        item.size === size.toLowerCase() && // Convert size to lowercase
        item.quantity === quantity
    )
    setInCart(inCart)
  }, [size, quantity, product._id])

  useEffect(() => {
    const updateOptions = () => {
      const selectedSize = size.toLowerCase()
      const availableOptions = Math.min(product.inStock[selectedSize], 50)
      if (availableOptions === 0) {
        setOptions([0])
        setQuantity(0)
      } else {
        const newOptions = Array.from(
          { length: availableOptions },
          (_, index) => index + 1
        )
        setOptions(newOptions)
        setQuantity(1)
      }
    }
    updateOptions()
  }, [size])

  const handleAddToCart = async () => {
    try {
      if (inCart) {
        navigate(`/user/cart/${user._id}`)
      } else {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/user/cart/add/${user._id}/${product._id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              quantity: quantity,
              size: size.toLowerCase(), // Convert size to lowercase
            }),
          }
        )
        const cart = await response.json()
        if (!cart?.message && !cart.error) {
          dispatch(setCart({ cart: cart }))
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddToWishlist = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/wishlist/${user._id}/${product._id}`,
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

  const handleQuantityChange = (event) => {
    const selectedQuantity = parseInt(event.target.value)
    setQuantity(selectedQuantity)
  }

  const handleSizeChange = (e) => {
    setSize(e.target.value.toLowerCase())
    setClickedButton(e.target.value)
  }

  const isQuantityZero = quantity === 0

  return (
    <div className="relative lg:w-1/2 min-h-[30rem] mx-4">
      <form
        action="post"
        className="flex flex-col items-center justify-start gap-[1.5rem] mt-[5rem] lg:mt-auto max-w-[35rem] lg:absolute lg:inset-0 m-auto"
      >
        <h2 className="text-[1.5rem] text-center mx-2 font-Roboto max-w-[25rem] font-medium">
          {name}
        </h2>
        <div className="text-center">
          <p className="text-sm font-Roboto text-gray-500">Price : {price}</p>
          <p className="text-sm font-Roboto text-gray-500">
            Inclusive of all taxes
          </p>
        </div>

        <div className="flex justify-between items-center w-full max-w-[28rem]">
          {['S', 'M', 'L', 'XL', 'XXL'].map((buttonId, index) => {
            return (
              <button
                key={index}
                type="button"
                value={buttonId}
                className={`rounded-[50%] w-[3.5rem] h-[3.5rem] transition-all duration-300 
                      ${
                        clickedButton === buttonId
                          ? `${
                              !isQuantityZero ? 'bg-green-300' : 'bg-red-500'
                            } text-white text-[1.25rem]`
                          : ''
                      }
                    `}
                onClick={handleSizeChange}
              >
                {buttonId}
              </button>
            )
          })}
        </div>

        <div className="flex justify-center items-center gap-4">
          <label className="block text-lg font-md font-Roboto text-gray-700 ">
            Quantity :
          </label>
          <select
            className="w-[4.5rem] border-[2px] py-[2px]"
            onChange={handleQuantityChange}
            value={quantity}
          >
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 items-center justify-center">
          <button
            className={`bg-green-300 text-white font-semibold text-[1.3rem] phone1:text-[1.5rem] py-4
             hover:bg-green-400 
              mt-4 flex justify-center items-center gap-2 transition-all duration-700 mx-4 w-[18rem] phone1:w-[21rem] md:py-[1.3rem] font-Roboto ${
                isQuantityZero ? 'bg-red-500' : '' // Add red background color for disabled button
              }`}
            type="button"
            onClick={isQuantityZero ? undefined : handleAddToCart} // Disable the button when quantity is zero
            disabled={isQuantityZero}
          >
            <img
              src="../cart2.png"
              alt="cart"
              className="h-[1.5rem] align-text-bottom phone1:h-[2.3rem]"
            />
            {!isQuantityZero
              ? !inCart
                ? 'Add to Cart'
                : 'Go to Cart'
              : 'Not in Stock'}
          </button>
          <button type="button" onClick={handleAddToWishlist}>
            <p className="text-[0.9rem] text-gray-500 hover:text-gray-500 transition-all duration-300">
              {inWishlist === false
                ? 'Add to wishlist ❣️'
                : 'Remove from wishlist ❣️'}
            </p>
          </button>
        </div>
      </form>
    </div>
  )

}

export default ProductForm


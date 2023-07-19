import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setWishlist } from '../state/slice'
import { useNavigate } from 'react-router-dom'
export const WishlistCard = (props) => {
  const productId = props.productId
  const [isHover,setIsHover]=useState(false)
  const [hoveredProductId, setHoveredProductId] = useState(null)
  const user = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [product, setProduct] = useState({})
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/product/${productId}`
        )
        const product = await response.json()
        setProduct(product)
      } catch (error) {}
    }
    getProduct()
  }, [productId])
  const handleRemoveFromWishlist = async (e) => {
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
  const handleOnClick = () => {
    navigate(`/product/${productId}`)
  }
  
  return (
    <div
      className="flex flex-col border justify-between items-center max-h-[20rem] border-collapse max-w-[15rem] cursor-pointer rounded-tl-[25px] rounded-br-[25px] hover:opacity-90 overflow-hidden"
      onMouseEnter={() => {
        setIsHover(true)
        setHoveredProductId(productId)
      }}
      onMouseLeave={() => {
        setIsHover(false)
        setHoveredProductId(null)
      }}
      onClick={handleOnClick}
      
    >
      <div className="w-[14rem] h-[15rem] overflow-hidden mt-2  rounded-tl-[25px] ">
        <img
          src={
            product.images && product.images.length > 0 ? product.images[0] : ''
          }
          alt="item"
          className="object-cover w-full h-full hover:scale-125 transition-all duration-700"
        />
      </div>
      <div className="w-full flex flex-col my-2 justify-start px-4 border-t pt-2">
        <div className="flex items-center justify-between ">
          <p
            className={`font-medium leading-tight overflow-hidden overflow-ellipsis text-base pt-[0.1rem cursor-pointer] ${
              isHover && hoveredProductId === productId
                ? 'text-blue-500'
                : 'text-gray-500'
            } truncate max-w-[12rem]`}
            
          >
            {product.name
              ? product.name
              : ''}
          </p>
          <button
            type="button"
            onClick={handleRemoveFromWishlist}
            className='p-2 flex-shrink-0 cursor-pointer rounded-full'
          >
            <img src="/icons8-trash-64 (1).png" alt="del" className="w-[20px] h-[20px]" />
          </button>
        </div>
        <p className="text-xl font-semibold mt-1 truncate text-gray-600">
          ₹ {product?.price}
        </p>
      </div>
    </div>
  )
}

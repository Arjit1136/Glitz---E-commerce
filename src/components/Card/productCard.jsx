import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setWishlist } from '../../state/slice'
import { useNavigate } from 'react-router-dom'
export const Product = (props) => {
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
          `http://localhost:3001/product/${productId}`
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
  const handleOnClick = () => {
    navigate(`/product/${productId}`)
  }
  
  return (
    <div
      className="flex flex-col border justify-between items-center max-h-[20rem] border-collapse max-w-[16rem]"
      onMouseEnter={() => {
        setIsHover(true)
        setHoveredProductId(productId)
      }}
      onMouseLeave={() => {
        setIsHover(false)
        setHoveredProductId(null)
      }}
      
    >
      <div className="w-[14rem] h-[15rem] overflow-hidden mt-2">
        <img
          src={
            product.images && product.images.length > 0 ? product.images[0] : ''
          }
          alt="item"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="w-full flex flex-col my-2 justify-start px-4">
        <div className="flex items-start justify-between">
          <p
            className={`font-medium leading-tight overflow-hidden overflow-ellipsis text-base pt-[0.1rem cursor-pointer] ${
              isHover && hoveredProductId === productId
                ? 'text-blue-500'
                : 'text-gray-500'
            } truncate max-w-[12rem]`}
            onClick={handleOnClick}
          >
            {product.name
              ? product.name
              : ''}
          </p>
          <button
            type="button"
            onClick={handleRemoveFromWishlist}
            className='w-[18px] h-[20px] flex-shrink-0 cursor-pointer'
          >
            <img src="/icons8-trash-64 (1).png" alt="del" className="" />
          </button>
        </div>
        <p className="text-xl font-semibold mt-1 truncate text-gray-700">
          ₹ {product?.price}
        </p>
      </div>
    </div>
  )
}

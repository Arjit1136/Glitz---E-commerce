import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export const DisplayCard = (props) => {
  const productId = props._id
  const [product, setProduct] = useState({})
  const [isHover, setIsHover] = useState(false)
  const [showPrice, setShowPrice] = useState(false)
  const navigate=useNavigate()
  useEffect(() => {
    const getProduct = async () => {
      try {
        props.handleIsLoading(true)
        
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/product/${productId}`
        )
        const product = await response.json()
        setProduct(product)
        props.handleIsLoading(false)

      } catch (error) {
        console.log(error)
      }
    }

    getProduct()
  }, [productId])

  const handleOnClick=()=>{
    navigate(`./product/${productId}`)
  }

  const handleMouseEnter = () => {
    setIsHover(true)
    setTimeout(() => {
      setShowPrice(true)
    }, 300) // Delaying the animation by 300ms
  }

  const handleMouseLeave = () => {
    setIsHover(false)
    setShowPrice(false)
  }

  return (
    <>
      {product.images && product.images.length > 0 ? (
        <div
          className="relative h-[20rem] w-[16rem] bg-white shadow rounded-tr-[50px] rounded-bl-[50px] overflow-hidden drop-shadow-lg cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleOnClick}
        >
          <img
            src={product.images[0]}
            alt="item"
            className="h-[20rem] w-[16rem] absolute inset-0 transition-all duration-300 opacity-100 hover:opacity-80"
          />
          {isHover && (
            <div
              className={`transition-opacity duration-300 ${
                showPrice ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <p className="absolute right-0 bottom-[2rem] bg-blue-700 text-white z-10 px-6 text-[1.2rem]">
                ₹ {product?.price}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>No image available</div>
      )}
    </>
  )
}

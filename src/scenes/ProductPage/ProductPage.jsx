import { useState, useEffect } from 'react'
import ProductForm from './ProductForm'
import { useParams } from 'react-router-dom'
import { Navbar } from '../Navbar/Navbar'
export const ProductPage = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorPositionPx, setCursorPositionPx] = useState({ x: 0, y: 0 })
  const [isZoomed, setIsZoomed] = useState(false)
  const [product, setProduct] = useState({})
  const { productId } = useParams()
  const { images } = product
  
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



  const handleMouseEnter = () => {
    setIsZoomed(true)
  }

  const handleMouseLeave = () => {
    setIsZoomed(false)
  }
  const handleMouseMove = (event) => {
    const { left, top, width, height } = event.target.getBoundingClientRect() //top left right bottom height width
    const x = ((event.clientX - left) / width) * 100
    const y = ((event.clientY - top) / height) * 100
    const xPx = event.clientX - left
    const yPx = event.clientY - top
    setCursorPositionPx({ x: xPx, y: yPx })
    setCursorPosition({ x, y })
  }
  return (
    <div>
      <Navbar/>
      {images && images.length > 0 && (
        <div className=" flex h-fit gap-auto auto mt-[1rem] md:mt-[3rem] lg:mt-[4rem] mb-[7rem] flex-col lg:flex-row items-center justify-center ">
          <div className="relative mx-4 border-2 border-gray-100">
            <img
              src={images[0]}
              alt="Your Image"
              className={`w-[32rem]`}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            {isZoomed && (
              <div
                className={`h-[11rem] w-[13rem] md:h-[12rem] md:w-[15rem] bg-center bg-no-repeat absolute m-auto z-30 hover:invisible border-gray-200 border-2 zoomed-screen`}
                style={{
                  backgroundImage: `url(${images[0]})`,
                  backgroundPositionX: `${cursorPosition.x}%`,
                  backgroundPositionY: `${cursorPosition.y}%`,
                  backgroundSize: '1024px 1280px',
                  left: `${cursorPositionPx.x - 250}px`,
                  top: `${cursorPositionPx.y - 200}px`,
                }}
              ></div>
            )}
          </div>
          <ProductForm product={product} key={productId} />
        </div>
      )}
    </div>
  )
}

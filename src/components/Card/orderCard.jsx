import {useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react'
export const OrderCard = (props) => {
  const product_data = props.product_data
  const { size, quantity } = product_data
  const [product, setProduct] = useState({})
  const navigate=useNavigate()
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/product/${product_data.productId}`
        )
        const product = await response.json()
        setProduct(product)
      } catch (error) {
        console.log(error)
      }
    }

    getProduct()
  }, [product_data.productId])

  return (
    <div>
      <li
        key={product.id}
        className="flex items-stretch justify-between space-x-5 py-7"
      >
        <div className="flex flex-1 items-stretch">
          <div className="flex-shrink-0">
            <img
              className="h-20 w-20 rounded-lg border border-gray-200 object-contain"
              src={
                product.images && product.images.length > 0
                  ? product?.images[0]
                  : '/icon.png'
              }
              alt="No image available"
            />
          </div>

          <div className="ml-5 flex flex-col justify-between">
            <div className="flex-1">
              <h3
                className="text-lg  leading-snug sm:pr-8 h-[3.50rem] pt-[0.20rem] overflow-hidden text-gray-700 cursor-pointer ..."
                onClick={()=>navigate(`/product/${product_data.productId}`)}
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
          </div>
        </div>

        <p className="text-lg text-gray-700 h-[1.755rem] pt-0 ">
          &#8377;{product.price}
        </p>
      </li>
    </div>
  )
}

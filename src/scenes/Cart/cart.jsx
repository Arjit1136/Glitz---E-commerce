import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { CartCard } from '../../components/Card/cartCard'
import { Navbar } from '../Navbar/Navbar'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { AddressForm } from '../../components/Card/addressForm'
import { setAddress, setCart, setOrders } from '../../state/slice'

export const Cart = () => {
  const { id } = useParams()
  const [fetchCart, setFetchCart] = useState([])
  const [address_data, setAddress_data] = useState('Select Address')
  const [totalPrice, setTotalPrice] = useState(0)
  const [isAddressForm, setIsAddressForm] = useState(false)
  const [isAddressField, setIsAddressField] = useState(false)
  const [addressId, setAddressId] = useState(null)
  const dispatch = useDispatch()
  const token = useSelector((state) => state.token)
  const shippingAddress =
    useSelector((state) => state.user.shippingAddress) || []
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/user/cart/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const data = await response.json()

        const { cart, totalPrice } = data

        dispatch(setCart({ cart: cart }))
        setFetchCart(cart)
        setTotalPrice(totalPrice)
      } catch (error) {
        console.error('Error fetching cart data:', error)
      }
    }
    fetchCartData()
  }, [])

  const removeFromCart = (productId) => {
    const removedProduct = fetchCart.find(
      (product) => product.productId._id === productId
    )
    const removedProductPrice =
      removedProduct.productId.price * removedProduct.quantity
    setTotalPrice(totalPrice - removedProductPrice)
    const updatedCart = fetchCart.filter(
      (product) => product.productId._id !== productId
    )
    setFetchCart(updatedCart)
  }

  const placeOrder = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/order/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            addressId: addressId,
          }),
        }
      )

      const data = await response.json()

      const { cart, orders } = data

      dispatch(setOrders({ orders: orders }))
      dispatch(setCart({ cart: cart }))
      setTotalPrice(0)
      setFetchCart(cart)
    } catch (error) {
      console.error('Error fetching cart data:', error)
    }
  }

  const removeAddress = async (removeAddressId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/address/remove/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            addressId: removeAddressId,
          }),
        }
      )
      const data = await response.json()

      if (!data.error && !data.message) {
        dispatch(setAddress({ address: data.shippingAddress }))
      }
    } catch (error) {
      console.error('Error fetching cart data:', error)
    }
  }
  const handleAddressForm = () => {
    setIsAddressForm(false)
  }

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gray-100">
      <Navbar />
      {fetchCart && fetchCart.length > 0 && (
        <div
          className={`fixed top-0 flex justify-center items-center w-[100vw] h-[100vh] z-50 ${
            isAddressForm ? '' : 'hidden'
          } `}
        >
          <div className="fixed w-[100vw] h-[100vh] z-20 opacity-30 bg-black"></div>
          <div className="w-[25rem] z-50 mx-2">
            <AddressForm onHandleAddressForm={handleAddressForm} />
          </div>
        </div>
      )}
      {fetchCart && fetchCart.length > 0 ? (
        <div className="mx-auto lg:max-w-[95vw] px-4 lg:px-0">
          <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl font-poppins">
              Shopping Cart
            </h1>
            <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
              <section
                aria-labelledby="cart-heading"
                className="rounded-lg bg-white lg:col-span-8"
              >
                <h2 id="cart-heading" className="sr-only">
                  Items in your shopping cart
                </h2>
                <ul role="list" className="divide-y divide-gray-200">
                  {fetchCart.map((product, index) => (
                    <CartCard
                      productId={product.productId._id}
                      product={product.productId}
                      size={product.size}
                      quantity={product.quantity}
                      key={index}
                      onRemoveFromCart={removeFromCart}
                    />
                  ))}
                </ul>
              </section>
              {/* Order summary */}
              <section
                aria-labelledby="summary-heading"
                className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0 "
              >
                <h2
                  id="summary-heading"
                  className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
                >
                  Price Details
                </h2>
                <div>
                  <dl className=" space-y-1 px-2 py-4">
                    <div className="flex items-center justify-between">
                      <dt className="text-sm text-gray-800">
                        Price ({fetchCart?.length})
                      </dt>
                      <dd className="text-sm font-medium text-gray-900">
                        ₹ {totalPrice}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <dt className="flex items-center text-sm text-gray-800">
                        <span>Discount</span>
                      </dt>
                      <dd className="text-sm font-medium text-green-700">
                        - ₹ 0
                      </dd>
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <dt className="flex text-sm text-gray-800">
                        <span>Delivery Charges</span>
                      </dt>
                      <dd className="text-sm font-medium text-green-700">
                        Free
                      </dd>
                    </div>
                    <div className="flex items-center justify-between border-y border-dashed py-4 ">
                      <dt className="text-base font-medium text-gray-900">
                        Total Amount
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        ₹ {totalPrice}
                      </dd>
                    </div>
                  </dl>
                  <div className="px-2 pb-4 font-medium text-green-700">
                    You will save ₹ 0 on this order
                  </div>
                </div>
                {/* Dropdown */}
                <div className="border-t  mx-2 mb-6 border-dashed"></div>
                <div className="relative mx-2 mb-6 border">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 truncate flex-grow items-start m-t px-1 ...">
                      {address_data}
                    </p>
                    <button
                      className=" focus:ring-1 focus:outline-none font-medium border-l text-sm px-4 py-2.5 text-center inline-flex items-center w-[2.7rem] h-[2.6rem] flex-shrink-0"
                      type="button"
                      onClick={() => {
                        setIsAddressField(!isAddressField)
                      }}
                    >
                      <img
                        src="/down.png"
                        alt="no image available"
                        className="object-fit scale-150"
                      />
                    </button>
                  </div>

                  {isAddressField && (
                    <div
                      className="z-10 bg-white divide-y divide-gray-100  shadow w-full absolute  border-2"
                      style={{ bottom: 'calc(100%)' }}
                    >
                      {shippingAddress.length > 0 && (
                        <ul
                          className="py-2 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdownDividerButton"
                        >
                          {shippingAddress.map((address, index) => {
                            return (
                              <li
                                className=" px-4 py-2 text-gray-500 hover:bg-gray-100 truncate ... flex justify-between cursor-pointer"
                                key={index}
                              >
                                <div
                                  className="flex-grow"
                                  onClick={() => {
                                    setAddress_data(
                                      `${address.street}, ${address.city}, ${address.state}, ${address.zipCode}`
                                    )
                                    setAddressId(address._id)
                                    setIsAddressField(false)
                                    setIsAddressForm(false)
                                  }}
                                >
                                  <p>{address.street}</p>
                                  <p className="truncate">
                                    {address.city}
                                    {' , '} {address.state}
                                  </p>
                                  <p>{address.zipCode}</p>
                                </div>
                                <button
                                  className="w-[1.1rem]"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    removeAddress(address._id)
                                  }}
                                >
                                  <img src="/Navbar/erase.png" alt="" />
                                </button>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                      <div
                        className="py-2"
                        onClick={() => {
                          // setIsAddressField(false)
                          setIsAddressForm(true)
                        }}
                      >
                        <p className="block px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 cursor-pointer text-center">
                          Add new address
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                {/* ..... */}
                <button
                  type="button"
                  className={`w-full bg-black text-white py-2 ${
                    addressId === null
                      ? 'opacity-70 cursor-not-allowed'
                      : ' cursor-pointer'
                  }`}
                  disabled={addressId === null || totalPrice === 0}
                  onClick={placeOrder}
                >
                  Checkout
                </button>
              </section>
            </form>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 m-auto w-[20rem] h-[12rem] border-2 bg-white rounded-lg flex flex-col justify-center items-center">
          <p className="text-gray-500 text-center text-[2rem] font-poppins ">
            Wow! Looks so empty.
          </p>
          <div onClick={() => navigate('/')} className="cursor-pointer">
            <div className="flex">
              <p className="text-gray-400 font-poppins">Explore</p>
              <img src="/icons8-arrow-25 (1).png" alt="" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

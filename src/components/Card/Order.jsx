import React from 'react'
import { OrderCard } from './orderCard'
import { useSelector } from 'react-redux'


export const Order = (props ) => {
  const order=props.order || []
  
  const phoneNumber=useSelector((state)=>state.user.phoneNumber)
  const date=new Date(order.date)
  const formattedDate=date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return (
    <div className="mx-auto my-4 max-w-4xl md:my-6">
      <div className="overflow-hidden rounded-xl border border-gray-100 shadow">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product List */}
          <div className="px-5 py-6 md:border-r md:border-r-gray-200 md:px-8">
            <div className="flow-root">
              <ul className="-my-7 divide-y divide-gray-200 max-w-full">
                {order.products.map((product_data, index) => (
                  <OrderCard product_data={product_data} key={index} />
                ))}
              </ul>
              <hr className="mt-6 border-gray-200" />
              <ul className="mt-6 space-y-3">
                <li className="flex items-center justify-between">
                  <p className="text-sm font-medium">Sub total</p>
                  <p className="text-sm font-medium">
                    &#8377;{order.totalPrice}
                  </p>
                </li>
                <li className="flex items-center justify-between">
                  <p className="text-sm font-medium ">Total</p>
                  <p className="text-sm font-bold ">
                    &#8377;{order.totalPrice}
                  </p>
                </li>
              </ul>
            </div>
          </div>
          {/* Contact Info */}
          <div className="px-5 py-6 md:px-8">
            <div className="flow-root">
              <div className="-my-6 divide-y divide-gray-200">
                <div className="py-6">
                  <h2 className="text-base font-bold text-black">
                    Contact Information
                  </h2>
                  <p className="fontmedium mt-3 text-xs text-gray-700">
                    Order Number: {1000000000 + props.index}
                  </p>
                  <p className="text-xs font-medium text-gray-700">
                    Date: {formattedDate}
                  </p>
                  <button
                    type="button"
                    className="mt-4 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    View Invoice
                  </button>
                </div>
                <div className="py-6">
                  <h2 className="mb-2 text-base font-bold text-black">
                    Shipping Information
                  </h2>
                  <p className="mt-3 text-xs font-medium text-gray-700">
                    {order.address.street}
                  </p>
                  <p className="text-xs font-medium text-gray-700">
                    {order.address.city} , {order.address.state} ,{' '}
                    {order.address.zipCode}
                  </p>
                  <p className="text-xs font-medium text-gray-700">
                    {phoneNumber}
                  </p>
                </div>
                <div className="py-6">
                  <h2 className="text-base font-bold text-black">
                    Payment Information
                  </h2>
                  <p className="mt-3 text-xs font-medium text-gray-700">
                    **** **** **** 6202
                  </p>
                  <p className="text-xs font-medium text-gray-700">
                    Expires 09/25
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

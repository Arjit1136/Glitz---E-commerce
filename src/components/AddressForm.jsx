import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {setAddress} from '../state/slice'
export const AddressForm = (props) => {
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [zipCode, setZipCode] = useState('')
  const _id  = useSelector((state)=>state.user?._id)
  const token=useSelector((state)=>state.token)
  const dispatch=useDispatch()
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/user/address/${_id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            street: street,
            city: city,
            state: state,
            country: country,
            zipCode: zipCode,
            
          }),
        }
      )
      const address = await response.json()
      
      if (!address.message && !address.error) {
        dispatch(setAddress({ address: address }))
      }
      props.onHandleAddressForm()
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (e) => {
    if (e.target.id !== 'zipCode') {
      const value = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
      switch (e.target.id) {
        case 'street':
          setStreet(value);
          break;
        case 'city':
          setCity(value);
          break;
        case 'state':
          setState(value);
          break;
        case 'country':
          setCountry(value);
          break;
        default:
          break;
      }
    } else {
      const inputZipCode = e.target.value.replace(/\D/g, '').slice(0, 6);
      setZipCode(inputZipCode);
    }
  };
  
  //The regular expression \D matches any non-digit character, and the g flag performs a global search to replace all occurrences.
  return (
    <div className="address-form  max-w-md bg-white shadow-md rounded px-4 py-3 ">
      <div className="flex justify-between items-center  mb-4">
        <h2 className="text-2xl">Enter Address</h2>
        <button onClick={()=>{props.onHandleAddressForm()}}>
          <img src="/Navbar/erase.png" alt="X" className="w-[1.2rem]" />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="street"
            className="block text-sm font-medium text-gray-700"
          >
            Street:
          </label>
          <input
            id="street"
            type="text"
            value={street}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City:
          </label>
          <input
            id="city"
            type="text"
            value={city}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
            State:
          </label>
          <input
            id="state"
            type="text"
            value={state}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country:
          </label>
          <input
            id="country"
            type="text"
            value={country}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="zipCode"
            className="block text-sm font-medium text-gray-700"
          >
            Zip Code:
          </label>
          <input
            id="zipCode"
            type="text"
            pattern="[0-9]{6}"
            value={zipCode}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-black w-full  text-white rounded disabled:bg-gray-400 "
          
        >
          Submit
        </button>
      </form>
    </div>
  )
}

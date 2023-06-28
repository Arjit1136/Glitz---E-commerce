import { useState } from 'react'
import { setLogin } from '../../state/slice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

export const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isUser, setIsUser] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  })

  const toggleForm = () => {
    setIsLogin(!isLogin)
    setFormData({
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
    })
  }

  const handleChange = (e) => {
    if (isUser) setIsUser(false)
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    const url = isLogin
      ? `${import.meta.env.VITE_BASE_URL}/auth/login`
      : `${import.meta.env.VITE_BASE_URL}/auth/register`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          isLogin
            ? { email: formData.email, password: formData.password }
            : formData
        ),
      })

      const loggedIn = await response.json()

      if (isLogin) {
        dispatch(
          setLogin({
            user: loggedIn.newUser,
            token: loggedIn.token,
          })
        )
        navigate('/')
      } else {
        if (loggedIn?.isUser) {
          setIsUser(true)
        } else {
          toggleForm()
          navigate('/user')
        }
      }
    } catch (error) {
      console.log('Error ', error)
    }
  }

  return (
    <div className="flex w-full min-h-screen justify-center items-center bg-gray-100">
      <div className="min-h-fit min-w-[25rem]">
        <form
          action="post"
          onSubmit={handleOnSubmit}
          className="bg-white p-6 rounded-lg shadow-md p-10"
        >
          <h1 className="text-center text-[2.5rem] font-lobster pb-5">
            {isLogin ? 'Login' : 'Register'}
          </h1>
          {!isLogin && isUser && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-[0.7rem]">
              <span className="block sm:inline">
                User already exists. Please choose a different email.
              </span>
            </div>
          )}

          {isLogin ? (
            <div className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="email" className="text-base text-gray-600">
                  Email:
                </label>
                <div className="flex items-center border rounded-md">
                  <img src="/mail.png" alt="mail" className="h-6 px-3" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 outline-none text-base"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="password" className="text-base text-gray-600">
                  Password:
                </label>
                <div className="flex items-center border rounded-md">
                  <img src="/padlock.png" alt="mail" className="h-6 px-3" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-2 outline-none"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="text-base text-gray-600">
                  First Name:
                </label>
                <div className="flex items-center border rounded-md">
                  <img src="/user.png" alt="mail" className="h-6 px-3" />
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full p-2 outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="lastName" className="text-base text-gray-600">
                  Last Name:
                </label>
                <div className="flex items-center border rounded-md">
                  <img src="/user.png" alt="mail" className="h-6 px-3" />
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full p-2  outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="text-base text-gray-600">
                  Email:
                </label>
                <div className="flex items-center border rounded-md">
                  <img src="/mail.png" alt="mail" className="h-6 px-3" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full p-2 outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="password" className="text-base text-gray-600">
                  Password:
                </label>
                <div className="flex items-center border rounded-md">
                  <img src="/padlock.png" alt="mail" className="h-6 px-3" />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full p-2 outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="phoneNumber"
                  className="text-base text-gray-600"
                >
                  Phone Number:
                </label>
                <div className="flex items-center border rounded-md">
                  <img src="/Navbar/phone.png" alt="phone" className="h-6 px-3" />
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full p-2 outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="bg-black text-white rounded-md py-2 w-full mt-8"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>

          <h1
            onClick={toggleForm}
            className="text-gray-600 cursor-pointer mt-2 text-[0.7rem] text-center"
          >
            {isLogin
              ? "Don't have an account? Sign Up!"
              : 'Already have an account? Login!'}
          </h1>
        </form>
      </div>
    </div>
  )
}

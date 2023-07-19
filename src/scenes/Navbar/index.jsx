import { useState, useRef , useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLogout } from '../../state/slice'
import { useNavigate} from 'react-router-dom'
export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const user = useSelector((state) => state.user) || false
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate=useNavigate()
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    setIsUserMenuOpen(false)
  }
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    // MENU
    <div className="m-auto px-4 relative py-2">
      <div
        className={`lg:hidden fixed bg-white  top-0 left-0 border-l-2 z-10 transition-all duration-[300] ease-in-out 
        ${isMenuOpen ? 'w-full' : 'w-0 overflow-hidden'}`}
      >
        <button
          className={`p-[0.5rem] rounded-lg border-black ml-2 mt-2 `}
          onClick={toggleMenu}
        >
          <img src="/Navbar/erase.png" alt="erase" className="h-[1.5rem]" />
        </button>
        <div className="mt-2 items-start flex flex-col h-[100vh] ml-12 cursor-pointer">
          <button className="py-[0.5rem]" onClick={() => navigate('/')}>
            <p className="text-[1.25rem] text-gray-500 font-poppins text-left">
              Home
            </p>
          </button>
          <button className="py-[0.5rem]">
            <p className="text-[1.25rem] text-gray-500 font-poppins">Blog</p>
          </button>
          <button className="py-[0.5rem]">
            <p className="text-[1.25rem] text-gray-500 font-poppins">About</p>
          </button>
          <button className="py-[0.5rem]">
            <p className="text-[1.25rem] text-gray-500 font-poppins">Contact</p>
          </button>
        </div>
      </div>
      {/* USER MENU */}

      <div className="flex justify-between">
        <div className="flex gap-4">
          <button
            className="border-black bg-center w-6 bg-contain lg:hidden"
            onClick={toggleMenu}
          >
            <img src="/Navbar/hamburger.png" alt="" />
          </button>

          <div className="gap-[1.5rem]  items-center flex ">
            <button
              className="rounded-md px-1 hidden lg:block cursor-pointer"
              onClick={() => navigate('/')}
            >
              <h1 className="text-[1.3rem] text-gray-500">Home</h1>
            </button>
            <button className="rounded-md px-1 hidden lg:block">
              <h1 className="text-[1.3rem] text-gray-500">Blog</h1>
            </button>
            <button className="rounded-md px-1 hidden lg:block">
              <h1 className="text-[1.3rem] text-gray-500">About</h1>
            </button>
            <button className="rounded-md px-1 hidden lg:block">
              <h1 className="text-[1.3rem] text-gray-500">Contact</h1>
            </button>
          </div>
        </div>
        {/* SEARCH */}
        <div className="flex gap-6 ">
          <div className="flex justify-center items-center w-[16rem] sm:min-w-[16rem]">
            <div className="relative">
              <div
                className={`absolute inset-y-0 left-0 flex items-center justify-center pl-3 pointer-events-none`}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 "
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full pl-10 p-2.5 "
                placeholder="Search"
                required
              />
            </div>
            <button
              type="button"
              className="p-2.5 ml-2 text-sm font-medium text-white bg-[#b097c5] rounded-lg border border-[#563e72] hover:bg-[#563E72] hover:ring-1 focus:outline-none focus:ring-[#563E72] "
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>

          
          {/* Dropdown */}

          <div className="flex items-center md:order-2 relative" ref={wrapperRef}>
            <button
              type="button"
              className="flex text-sm  rounded-full md:mr-0"
              id="user-menu-button"
              onClick={() => {
                setIsUserMenuOpen(!isUserMenuOpen)
                setIsMenuOpen(false)
              }}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-9 max-h-9 rounded-full"
                src="/user-icon.png"
                alt="user-photo"
              />
            </button>

            {isUserMenuOpen && (
              <div className="z-50  my-4 text-base list-none bg-[#563E72] divide-y rounded-lg shadow divide-gray-600 absolute top-8 right-6">
                {user ? (
                  <ul
                    className="pt-2 min-w-[9rem]"
                    aria-labelledby="user-menu-button"
                  >
                    <li>
                      <p
                        onClick={() => {
                          navigate('/user/wishlist')
                        }}
                        className="block px-4 py-2 text-sm  hover:bg-[#AA92C4]  text-white  "
                      >
                        Wishlist
                      </p>
                    </li>
                    <li>
                      <p
                        onClick={() => {
                          navigate(`/user/cart/${user._id}`)
                        }}
                        className="block px-4 py-2 text-sm  hover:bg-[#AA92C4]  text-white  "
                      >
                        Cart
                      </p>
                    </li>
                    <li>
                      <p
                        onClick={() => {
                          navigate(`/user/orders/${user._id}`)
                        }}
                        className="block px-4 py-2 text-sm  hover:bg-[#AA92C4]  text-white  "
                      >
                        Orders
                      </p>
                    </li>

                    <div className=" border-t-2 border-[#AA92C4]">
                      <p
                        onClick={() => {
                          dispatch(setLogout())
                        }}
                        className="block px-4 py-3 text-sm  hover:bg-[#AA92C4]  text-white"
                      >
                        Logout
                      </p>
                    </div>
                  </ul>
                ) : (
                  <ul
                    className="py-2 min-w-[9rem]"
                    aria-labelledby="user-menu-button"
                  >
                    <li>
                      <p
                        onClick={() => {
                          navigate('/user/')
                        }}
                        className="block px-4 py-2 text-sm  hover:bg-[#AA92C4]  text-white  "
                      >
                        Login
                      </p>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

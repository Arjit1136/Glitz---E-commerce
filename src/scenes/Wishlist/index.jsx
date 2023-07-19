import { useSelector } from "react-redux";
import { UserWidget } from "../Widgets/userWidget";
import { WishlistCard } from "../../components/WishlistCard";
import {Navbar} from '../Navbar'
import { useNavigate } from "react-router-dom";
export const Wishlist=()=>{
    const wishlist=useSelector((state)=>state.user?.wishList) || []
    const navigate=useNavigate()
    
    return (
      <div className="w-[100vw] min-h-[100vh] bg-gray-100">
        <Navbar />
        {wishlist.length > 0 ? (
          <div className="md:mx-auto mt-5 md:mt-10 flex px-4 justify-center  w-full lg:max-w-[98vw] pb-12">
            <UserWidget />
            <div className="mx-4 border-collapse bg-gray-50">
              <div className="border-2 lg:py-3 pl-2">
                <p className="text-[1.2rem] md:text-[1.5rem] from-neutral-950 font-poppins">
                  My Wishlist ({wishlist.length})
                </p>
              </div>
              <div className="grid grid-cols-1 tablet:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-2 border-x-2 border-b-2 ">
                {wishlist.map((item, index) => {
                  return (
                    <div key={index}>
                      <WishlistCard productId={item} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 m-auto w-[20rem] h-[12rem] border-2 bg-white rounded-lg flex flex-col justify-center items-center">
            <p className="text-gray-500 text-center text-[2rem] font-poppins ">
              Wow! Looks so empty.
            </p>
            <a href="" onClick={() => navigate('/')}>
              <div className="flex">
                <p className="text-gray-400 font-poppins">Explore</p>
                <img src="/icons8-arrow-25 (1).png" alt="" />
              </div>
            </a>
          </div>
        )}
      </div>
    )
}
import { Order } from "../../components/Card/Order"
import { Navbar } from "../Navbar/Navbar"
import { useSelector } from "react-redux"

export const Orders=()=>{
    const orders=useSelector((state)=>state.user.orders) || []
    return (
      <div>
        <Navbar />
        {orders && orders.length>0 ?<div className="px-4">
          {orders.map((order,index)=>{
            return <Order order={order} key={index} index={index}/>
          })}
        </div>:(
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
import { useState } from 'react'
import { Navbar } from '../Navbar'
import { bestSeller } from '../../data/bestSellar'
import { trending } from '../../data/trending'
import { BlogCard } from '../../components/BlogCard'
import {blogs} from '../../data/blog'
import { DisplayCard } from '../../components/DisplayCard'
import { LoadingComponent } from '../../components/Loader'

export const HomePage = () => {
  const [isLoading,setIsLoading]=useState(true)
  const handleIsLoading=(loading)=>{
    setIsLoading(loading)
  }
  return (
    <div className="bg-gray-[#e3e5e7] ">
      <div>
        <Navbar />
      </div>
      <div
        className="bg-cover bg-right bg-no-repeat w-[100%]"
        style={{ backgroundImage: "url('./Homepage/Main-2.jpg')" }}
      >
        <div className="flex flex-col items-center justify-center min-h-[18rem] sm:min-h-[20rem] md:min-h-[25rem] lg:min-h-[30rem] xl:min-h-[35rem] ">
          <h1 className="text-[5rem] sm:text-[8rem] font-Kaushan text-white">
            Glitz
          </h1>
          <button className="bg-white rounded-[25px] px-12 py-1 mt-3">
            <h1 className="text-[0.8rem]">Explore</h1>
          </button>
        </div>
      </div>

      {/*Grid-Section */}
      <div className="mt-16 h-[55rem] phone:60rem phone1:h-[67rem] tablet:h-[50rem] laptop:h-[35rem] grid grid-cols-2 mx-2  laptop:grid-cols-4 gap-2 tablet:grid-cols-3 ">
        <div
          className="relative bg-center bg-cover bg-no-repeat  hover:opacity-80 transition-all duration-700"
          style={{ backgroundImage: "url('./Homepage/sale-1.webp')"}}
        >
          <button className="absolute inset-0 m-auto w-fit">
            <h1 className="text-black text-[1rem] bg-white px-8 py-1 rounded-sm ">
              Sale
            </h1>
          </button>
        </div>
        <div
          className="relative row-span-2 bg-cover bg-top bg-no-repeat hover:opacity-80 transition-all duration-700"
          style={{ backgroundImage: "url('./Homepage/women-1.webp')" }}
        >
          <button className="absolute inset-0 m-auto w-fit">
            <h1 className="text-black text-[1rem] bg-white px-8 py-1 rounded-sm ">
              Women
            </h1>
          </button>
        </div>
        <div
          className="relative bg-top bg-cover bg-no-repeat hover:opacity-80 transition-all duration-700"
          style={{ backgroundImage: "url('./Homepage/men-1.webp')" }}
        >
          <button className="absolute inset-0 m-auto w-fit">
            <h1 className="text-black text-[1rem] bg-white px-8 py-1 rounded-sm ">
              Men
            </h1>
          </button>
        </div>
        <div
          className="relative bg-center bg-cover bg-no-repeat hover:opacity-80 transition-all duration-700"
          style={{ backgroundImage: "url('./Homepage/access-1.webp')" }}
        >
          <button className="absolute inset-0 m-auto w-fit">
            <h1 className="text-black text-[1rem] bg-white px-8 py-1 rounded-sm ">
              Accessories
            </h1>
          </button>
        </div>
        <div
          className="relative bg-center bg-cover bg-no-repeat hover:opacity-80 transition-all duration-700"
          style={{ backgroundImage: "url('./Homepage/new-1.webp')" }}
        >
          <button className="absolute inset-0 m-auto w-fit">
            <h1 className="text-black text-[1rem] bg-white px-8 py-1 rounded-sm ">
              New
            </h1>
          </button>
        </div>
        <div
          className="relative col-span-2 row-span-2 phone2:row-span-1 tablet:row-span-1 tablet:col-span-3 bg-center bg-cover bg-no-repeat laptop:col-span-2 hover:opacity-80 transition-all duration-700"
          style={{ backgroundImage: "url('./Homepage/shoes-1.webp')" }}
        >
          <button className="absolute inset-0 m-auto w-fit">
            <h1 className="text-black text-[1rem] bg-white px-8 py-1 rounded-sm ">
              Shoes
            </h1>
          </button>
        </div>
      </div>

      {/*Best-Seller */}
      <div>
        <h1 className="text-[1.6rem] text-center font-Rubik mt-12 font-medium">
          Best Sellers
        </h1>
        <p className="text-center mt-4 text-[1rem]">TOP PRODUCTS OF THE WEEK</p>
      </div>
      <div className=" mx-[1rem] flex gap-[3rem] items-center justify-center mt-[4rem] flex-wrap">
        {bestSeller.map((id, index) => (
          <DisplayCard key={index} _id={id} handleIsLoading={handleIsLoading} />
        ))}
      </div>
      {/*Trending */}
      <div>
        <h1 className="text-[1.6rem] text-center font-Rubik mt-12 font-medium">
          TRENDING
        </h1>
        <p className="text-center mt-4 text-[1rem]">TOP WIShES OF THE WEEK</p>
      </div>
      <div className=" mx-[1rem] flex gap-[3rem] items-center justify-center mt-[4rem] flex-wrap">
        {trending.map((id, index) => (
          <DisplayCard key={index} _id={id} handleIsLoading={handleIsLoading} />
        ))}
      </div>

      {/* Blog Section*/}
      <div className="mt-[12rem] pb-[10rem] mx-[1rem]">
        <p className="text-[1.6rem] text-center font-Rubik mt-12 font-medium">
          LATEST FROM BLOG
        </p>
        <p className="text-center mt-4 text-[1rem]">
          THE FRESHEST AND MOST EXCITING NEWS
        </p>
        <div className="flex justify-center items-center flex-wrap mt-[6rem] gap-[2rem] ">
          {blogs.map((blog, index) => {
            return <BlogCard key={index} img={blog} />
          })}
        </div>
      </div>
      <LoadingComponent isLoading={isLoading} />
    </div>
  )
}

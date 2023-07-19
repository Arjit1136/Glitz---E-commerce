import { useState } from "react"

export const BlogCard = (props) => {
  const [isHover, setIsHover] = useState(false)
  return (
    <div
      className={`relative wrapper w-[16rem] h-[20rem] overflow-hidden rounded-tr-[50px] rounded-bl-[50px] shadow-lg`}
      onMouseEnter={() => {
        setIsHover(true)
      }}
      onMouseLeave={() => {
        setIsHover(false)
      }}
    >
      {props.img.length > 0 && ( // Check if the img prop is not empty
        <img
          src={`${props.img.toString()}`}
          alt="blog-img"
          className="transition-all duration-700 opacity-1 hover:opacity-80"
        />
      )}
      <div
        className={`absolute bottom-0 min-h-[0%] w-full rounded-tr-[50px] transition-all duration-700 bg-white ${
          isHover === true ? 'min-h-[71%]' : 'min-h-[0%]' // Conditionally apply min-h-[70%] class
        }`}
      ></div>
    </div>
  )
}

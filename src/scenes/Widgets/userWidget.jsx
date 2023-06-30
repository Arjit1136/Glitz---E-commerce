import { useSelector } from 'react-redux'
export const UserWidget = () => {
  const user = useSelector((state) => state.user)
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  const name = capitalizeFirstLetter(user?.firstName) + ' ' + capitalizeFirstLetter(user?.lastName) || ''
  return (
    <div className="w-fit max-w-[13rem] border-2 border-gray-200 h-fit hidden laptop:block bg-gray-50">
      <div className="flex w-full gap-3">
        <img
          src="/user-icon.png"
          alt="My Image"
          className="w-1/5 min-w-[3rem] mb-1 ml-1 mt-1 max-h-[3.2rem] "
        />
        <div className="flex flex-col justify-start  w-full my-1 mr-1">
          <p className="text-[0.8rem] text-gray-400 font-poppins ">Hello,</p>
          <p className="text-[1.3rem] whitespace-nowrap">
            {name.length > 12 ? name.slice(0, 10) + '...' : name}
          </p>
        </div>
      </div>
      <div></div>
    </div>
  )
}

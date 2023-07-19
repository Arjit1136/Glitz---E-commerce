import { Loader2 } from 'lucide-react'

export const LoadingComponent = ({ isLoading }) => {
  if (!isLoading) {
    return null
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 ">
      <div className="animate-spin">
        <Loader2 size={32} color="#fff" />
      </div>
    </div>
  )
}

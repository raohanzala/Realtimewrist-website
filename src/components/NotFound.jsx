const NotFound = () => {
  return (
    <div className="flex items-center absolute top-[50%] h-full -translate-y-[50%] w-full left-0 justify-center py-20 bg-gray-100 p-4">
          <div className="bg-white border border-gray-300 rounded-lg p-10 shadow-md max-w-md text-center">
            <h1 className="text-2xl font-bold text-red-600">404 Page Not Found</h1>
          </div>
        </div>
  )
}

export default NotFound
import React from 'react'

const NewsLetterBox = () => {


  const onSubmitHandler= (e)=>{
    e.preventDefault()
  }

  return (
    <div className='text-center pt-12'>
      <p className='text-2xl font-medium text-gray-800'>Join Our Community</p>
      <p className='text-gray-400 mt-3'>Sign up to receive the latest news, updates, and exclusive offers!</p>
      <form  onSubmit={onSubmitHandler} className='max-w-[500px] flex items-center gap-3 rounded-sm overflow-hidden mx-auto my-6 border pl-3'>
        <input className='w-full sm:flex-1 text-sm focus:outline-none' type="email" placeholder='Enter email for newslatter' required />
        <button type='submit' className='bg-dark-2 text-white text-xs font-semibold px-3 sm:px-4 py-4'>SUBSCIRBE</button>
      </form>
        <p className=' text-gray-600 mt-4 text-sm'>By signing up, you agree to our Terms of Service and Privacy Policy.</p>
    </div>
  )
}

export default NewsLetterBox
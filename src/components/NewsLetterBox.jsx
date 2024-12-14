import React from 'react'

const NewsLetterBox = () => {


  const onSubmitHandler= (e)=>{
    e.preventDefault()
  }

  return (
    <div className='text-center pt-12'>
      <p className='text-2xl font-medium text-gray-800'>Join Our Community</p>
      <p className='text-gray-400 mt-3'>Sign up to receive the latest news, updates, and exclusive offers!</p>
      <form  onSubmit={onSubmitHandler} className='w-full sm:w-1/3 flex items-center gap-3 rounded-sm overflow-hidden mx-auto my-6 border pl-3'>
        <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter your email for newslatter' required />
        <button type='submit' className='bg-[#232323] text-white text-xs font-semibold px-4 py-4'>SUBSCIRBE</button>
      </form>
        <p className=' text-gray-600 mt-4 text-sm'>By signing up, you agree to our Terms of Service and Privacy Policy.</p>
    </div>
  )
}

export default NewsLetterBox
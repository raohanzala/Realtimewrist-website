import React from 'react';
import { Link } from 'react-router-dom';

const NewsLetterBox = () => {
  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  return (
    <div className="text-center pt-12">
      {/* Heading */}
      <h2 className="text-2xl text-gray-900">Join Our Community</h2>
      <p className="text-gray-500 mt-2">Sign up to receive the latest news, updates, and exclusive offers!</p>

      {/* Form */}
      <form 
        onSubmit={onSubmitHandler} 
        className="max-w-lg mx-auto my-6 flex items-center gap-2 border border-gray-300 rounded overflow-hidden bg-white shadow-sm"
      >
        <input 
          className="w-full px-4 py-3 text-sm text-gray-700 focus:outline-none "
          type="email"
          placeholder="Enter your email for newsletter"
          required 
        />
        <button 
          type="submit"
          className="bg-dark-2 text-white text-sm font-semibold px-5 py-4 rounded-sm transition-all duration-300 hover:bg-dark-1"
        >
          SUBSCRIBE
        </button>
      </form>

      {/* Terms & Conditions */}
      <p className="text-gray-600 text-sm mt-3">
        By signing up, you agree to our 
        <a href="#" className="text-primary-1 hover:underline"> Terms of Service </a> 
        and 
        <Link to={'/privacy-policy'} className="text-primary-1 hover:underline"> Privacy Policy</Link>.
      </p>
    </div>
  );
};

export default NewsLetterBox;

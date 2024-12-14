import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useCallback } from 'react';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import LoadingSpinner from './LoadingSpinner';

const SearchBar = ({ setShowSearch }) => {
  const [query, setQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);

  const {backendUrl} = useContext(ShopContext)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowSearch]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (query.trim() === '') {
        setFilteredProducts([]);
        return;
      }

      setIsLoading(true);

      try {
        const response = await axios.get(backendUrl + `/api/product/search?query=${query}`);
        if (response.data.success) {
          setFilteredProducts(response.data.products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setFilteredProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceFetch = setTimeout(fetchProducts, 300); // Debounce API calls
    return () => clearTimeout(debounceFetch);
  }, [query]);

  return (
    <div
      ref={searchRef}
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[999] flex justify-center items-start pt-20"
    >
      <div className="bg-white rounded-sm w-11/12 sm:w-3/4 md:w-1/2 p-4">
        <div className="flex justify-between items-center border-b pb-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full border-none outline-none text-lg px-2"
          />
          <button
            onClick={() => setShowSearch(false)}
            className="text-2xl hover:text-[#cba135] text-gray-500"
          >
            <IoMdClose />
          </button>
        </div>

        {isLoading && <div className='py-6'> <LoadingSpinner className='size-6'/></div>}

        {filteredProducts.length > 0 && !isLoading && (
          <div className="mt-4 max-h-60 overflow-y-auto">
            {filteredProducts.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id}>
                <div className="p-2 border-b cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center">
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded mr-4"
                    />
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.newPrice}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && query && !isLoading && (
          <div className="mt-4 text-center text-gray-500">No products found.</div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;

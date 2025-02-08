import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useCallback } from 'react';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Spinner from './Spinner';
import { CURRENCY } from '../utils/contants';
import { formatAmount } from '../helpers';
import { useOutsideClick } from '../hooks/useOutsideclick';
import { RiSearchLine } from 'react-icons/ri';

const SearchBar = ({ setShowSearch }) => {
  const [query, setQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { backendUrl } = useContext(ShopContext)
  const close = ()=> setShowSearch(false)

  const ref = useOutsideClick(close, false)

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

    const debounceFetch = setTimeout(fetchProducts, 300);
    return () => clearTimeout(debounceFetch);
  }, [query]);

  return (
    <div
      
      className="fixed top-0 left-0 w-full h-full bg-black backdrop-blur-sm bg-opacity-50 z-[999] flex justify-center items-start pt-20"
    >
      <div className="bg-white rounded-sm w-11/12 sm:w-3/4 md:w-1/2 p-4 " ref={ref}>
        <div className="flex justify-between items-center border-b ">
          <div className="flex items-center  border-gray-300 w-full bg-white rounded overflow-hidden">
        <span className="flex items-center pl-3 text-[#5c5c5c]">
          <RiSearchLine />
        </span>
        <input
          className="py-[10px] px-2 text-base w-full focus:outline-none"
          type="text"
          placeholder='Search products...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          />
      </div>
          <button
            onClick={() => setShowSearch(false)}
            className="text-xl hover:text-text-color text-gray-500"
          >
            <IoMdClose />
          </button>
        </div>

        {isLoading && <div className='py-6 flex items-center justify-center'> <Spinner variant={'secondary'} /></div>}

        {filteredProducts.length > 0 && !isLoading && (
          <div className="mt-4 max-h-60 overflow-y-auto">
            {filteredProducts.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id}>
                <div className="p-2 border-b cursor-pointer hover:bg-gray-100" onClick={()=> setShowSearch(false)}>
                  <div className="flex items-center">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-sm mr-4"
                    />
                    <div>
                      <p className="font-semibold">{product.name}</p>
                      <p className="text-sm text-gray-500">{CURRENCY}{formatAmount(product.newPrice)}</p>
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

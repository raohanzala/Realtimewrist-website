import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { useRef } from 'react';
import axios from 'axios'


const Collection = () => {
  const { products = [], search, showSearch, backendUrl } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const [pageProducts, setPageProducts] = useState([]); // All loaded products
  const [page, setPage] = useState(1); // Current page of products
  const [isLoading, setIsLoading] = useState(false); // Loading indicator for infinite scroll
  const [hasMore, setHasMore] = useState(true); // Flag to check if there are more products to load
  const loaderRef = useRef(null); // Reference for infinite scroll detection

  const toggleCategory = (e) => {
    const { value } = e.target;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const { value } = e.target;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]
    );
  };

  const applyFilter = () => {
    let productsCopy = [...pageProducts];

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    sortProduct(productsCopy);
  };

  const sortProduct = (productsToSort) => {
    let sortedProducts = [...productsToSort];

    switch (sortType) {
      case 'low-high':
        sortedProducts.sort((a, b) => a.newPrice - b.newPrice);
        break;
      case 'high-low':
        sortedProducts.sort((a, b) => b.newPrice - a.newPrice);
        break;
      default:
        break;
    }

    setFilterProducts(sortedProducts);
  };

  const fetchProducts = async () => {
    // if (isLoading) return; // Stop duplicate calls
    setIsLoading(true);
    try {
      const response = await axios.get(backendUrl + `/api/product/paginated-list?page=${page}&limit=10`);
      const newProducts = response.data.products;

      console.log(response, 'paginatesd')

      // Filter out duplicate products
      setPageProducts((prevProducts) => {
        const combinedProducts = [...prevProducts, ...newProducts];
        const uniqueProducts = combinedProducts.filter(
          (item, index, array) => array.findIndex(p => p._id === item._id) === index
        );
        return uniqueProducts;
      });

      // Correctly check pagination data
      if (response.data.pagination.currentPage >= response.data.pagination.totalPages) {
        setHasMore(false); // No more pages to load
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1); // Increment page to fetch new products
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    // Clean up observer when component unmounts
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore]);

  useEffect(() => {
    fetchProducts(page);
  }, [page]);


  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, pageProducts]);

  useEffect(() => {
    if (filterProducts.length > 0) {
      sortProduct(filterProducts);
    }
  }, [sortType]);

  if (!filterProducts) {
    return <LoadingSpinner />
  }


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t max-w-[1280px] mx-auto'>
      {/* Filter Options */}
      <div className="min-w-60 ">
        <p onClick={() => setShowFilter(prev => !prev)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="Dropdown Icon" />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'}`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value='Men' onChange={toggleCategory} /> Men
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value='Women' onChange={toggleCategory} /> Women
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'}`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value='Chain' onChange={toggleSubCategory} /> Chain Watches
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value='Strap' onChange={toggleSubCategory} /> Strap Watches
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value='Automatic' onChange={toggleSubCategory} /> Automatic Watches
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value='Quartz' onChange={toggleSubCategory} /> Quartz Watches
            </p>
          </div>
        </div>
      </div>

      <div className='flex-1'>
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by : Relevant</option>
            <option value="low-high">Sort by : Low to High</option>
            <option value="high-low">Sort by : High to Low</option>
          </select>
        </div>

        <div className='relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.length > 0 && (
            filterProducts.map((item) => (
              <ProductItem
                key={item._id}
                name={item.name}
                description={item.description}
                newPrice={item.newPrice}
                oldPrice={item.oldPrice}
                id={item._id}
                image={item.image}
                size={item.sizes}
              />
            ))
          )}
        </div>

        <div className='py-5'>
          {isLoading && <LoadingSpinner />}
        </div>
        <div ref={loaderRef} className='h-10 w-full bg-red-500'></div>
        {!hasMore && <p className='text-center text-gray-500 mt-4'>No more products to load</p>}
      </div>
    </div>
  );
};

export default Collection;

import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import Spinner from '../components/Spinner';
import { useRef } from 'react';
import axios from 'axios'
import Empty from '../components/Empty';
import { IoChevronDownSharp } from "react-icons/io5";

const Collection = () => {
  const { products = [], search, showSearch, backendUrl } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const [pageProducts, setPageProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

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

  console.log(category, subCategory, 'CATE')

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
    setIsLoading(true);
    try {
      const response = await axios.get(backendUrl + `/api/product/products?page=${page}&limit=10`);
      const newProducts = response.data.products;

      console.log(response, 'paginatesd')

      setPageProducts((prevProducts) => {
        const combinedProducts = [...prevProducts, ...newProducts];
        const uniqueProducts = combinedProducts.filter(
          (item, index, array) => array.findIndex(p => p._id === item._id) === index
        );
        return uniqueProducts;
      });

      if (response.data.pagination.currentPage >= response.data.pagination.totalPages) {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false)
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

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasMore]);

  useEffect(() => {
    fetchProducts(page);
  }, [page]);


  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, pageProducts, applyFilter]);

  useEffect(() => {
    if (filterProducts.length > 0) {
      sortProduct(filterProducts);
    }
  }, [sortType, sortProduct, filterProducts]);

  if (!filterProducts) {
    return <Spinner />
  }

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t max-w-[1280px] mx-auto px-5'>
      {/* Filter Options */}
      <div className=" min-w-48 lg:min-w-60 ">
        <p onClick={() => setShowFilter(prev => !prev)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          <p className={` text-lg ${!showFilter ? '-rotate-90' : ''}`}><IoChevronDownSharp />
          </p>
        </p>
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
        <div className="flex justify-between items-center mb-5 text-base sm:text-2xl">
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 py-3 focus:outline-none focus:ring-2 focus:ring-primary-1 rounded text-sm px-2'>
            <option value="relevant">Sort by : Relevant</option>
            <option value="low-high">Sort by : Low to High</option>
            <option value="high-low">Sort by : High to Low</option>
          </select>
        </div>

        <div className='relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {isLoading ? <ProductSkeleton /> : filterProducts.length > 0 && (
            filterProducts.map((item) => (
              <ProductItem
                key={item._id}
                name={item.name}
                description={item.description}
                newPrice={item.newPrice}
                oldPrice={item.oldPrice}
                id={item._id}
                images={item.images}
                size={item.sizes}
                availability={item.availability}
              />
            ))
          )}
        </div>
        <div className='py-10 flex justify-center items-end'>
          {isLoading ? <Spinner variant={'secondary'} /> : <Empty resourceName='products'/>}
        </div>
        <div ref={loaderRef} className='h-10 w-full '></div>
        {!hasMore && <p className='text-center text-gray-500 mt-4'>No more products to load</p>}
      </div>


    </div>
  );
};

const ProductSkeleton = () => {
  const skeletons = Array(10).fill(0);

  return (
    <>
      {skeletons.map((_, index) => (
        <div key={index} className="flex relative w-full hover:shadow-md h-auto flex-col text-gray-700 cursor-pointer bg-white overflow-hidden transform transition-all border rounded animate-pulse">

          <div className="relative overflow-hidden aspect-w-1 aspect-h-1 w-full">
            <div className="absolute w-full h-full object-cover bg-gray-300"></div>
          </div>

          <div className="text-center relative py-3 px-2 z-10">
            <div className="h-4 bg-gray-200 rounded-sm w-32 mb-1 mx-auto"></div>
            <div className="h-3 bg-gray-200 rounded-sm w-24 mb-2 mx-auto"></div>
            <div className="flex gap-2 justify-center items-center mt-2">
              <div className="h-4 bg-gray-200 rounded-sm w-16"></div>
              <div className="h-4 bg-gray-200 rounded-sm w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};


export default Collection;

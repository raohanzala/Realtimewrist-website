import { useState } from 'react';
import ProductItem from '../components/ProductItem';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useProductsByCategory } from '../api/useProductsCategory';
import CollectionsSidebar from '../components/CollectionsSidebar';
import SortingSelect from '../components/SortingSelect';



const CategoryProducts = () => {

  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const { categoryId, category } = useParams();
  const { products, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useProductsByCategory(categoryId);


  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 mx-auto max-w-[1280px] sm:px-5 px-3">
      <CollectionsSidebar />

      <div className="flex-1">
        <SortingSelect category={category} />

        {/* Products Grid */}
        <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-4 gap-2 gap-y-6">
          {status === 'pending' ? <ProductSkeleton /> : products?.length > 0 ? (
            products?.map((item) => (
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
          ) : (
            <p className="text-center w-full">No products found.</p>
          )}
        </div>

        {/* Load More Button */}
        {hasNextPage && (
          <div className="flex justify-center mt-5">
            <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} className="bg-blue-600 text-white px-4 py-2 rounded">
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </button>
          </div>
        )}

        {!hasNextPage && (
          <p className="text-center text-gray-500 mt-4">
            No more products to load.
          </p>
        )}
      </div>
    </div>

  )
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


export default CategoryProducts;
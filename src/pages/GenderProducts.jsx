import { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import Spinner from "../components/Spinner";
import { useRef } from "react";
import Empty from "../components/Empty";
import SortingSelect from '../components/SortingSelect'
import { useParams } from "react-router-dom";
import CollectionsSidebar from "../components/CollectionsSidebar";
import { useProductsByGender } from "../api/useProdductsByGender";

const GenderProducts = () => {
  const [sortType, setSortType] = useState("relevant");
  const loaderRef = useRef(null);

  const { gender } = useParams();
  const {
    products = [],
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useProductsByGender(gender);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // if (error) return "Something went wrong";

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 mx-auto max-w-[1280px] px-5">
      {/* Filter Options */}
      <CollectionsSidebar isShowFilter={false} />

      <div className="flex-1">
      <SortingSelect category={gender}/>

        <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {status === 'pending' ? (
            <ProductSkeleton />
          ) : error ? 'Something went wrong' : (
            products &&
            products.length > 0 &&
            products.map((item) => (
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

        <div className="py-10 flex justify-center items-end">
          {status === 'pending' ? (
            <Spinner variant={"secondary"} />
          ) : (
            !products?.length && <Empty resourceName="products" />
          )}
        </div>

        {/* Loader Trigger */}
        <div ref={loaderRef} className="h-10 w-full"></div>

        {!hasNextPage && (
          <p className="text-center text-gray-500 mt-4">
            No more products to load
          </p>
        )}
      </div>
    </div>
  );
};

const ProductSkeleton = () => {
  const skeletons = Array(10).fill(0);

  return (
    <>
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="flex relative w-full hover:shadow-md h-auto flex-col text-gray-700 cursor-pointer bg-white overflow-hidden transform transition-all border rounded animate-pulse"
        >
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

export default GenderProducts;

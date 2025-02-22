import { useEffect } from 'react';
import ProductItem from '../components/ProductItem';
import Spinner from '../components/Spinner';
import { useRef } from 'react';
import Empty from '../components/Empty';
import { useProducts } from '../api/useProducts';
import CollectionsSidebar from '../components/CollectionsSidebar';
import SortingSelect from '../components/SortingSelect';



const Collection = () => {

  const { products, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useProducts();
  const observerRef = useRef(null);

  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasNextPage, fetchNextPage]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t max-w-[1280px] mx-auto px-5">
      <CollectionsSidebar />

      <div className="flex-1">
        <div className="flex justify-between items-center mb-3 text-base sm:text-2xl">
          <SortingSelect category={'All'}/>
        </div>

        <div className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 overflow-y-scroll">
          {status === "pending" ? (
            <ProductSkeleton />
          ) : products?.length > 0 ? (
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
            <div className='col-span-4'>
            <Empty resourceName="products" />
            </div>
          )}
        </div>

        {isFetchingNextPage && <Spinner variant={"secondary"} />}

        <div ref={observerRef} className="h-10"></div>
      </div>
    </div>
  );
};

const ProductSkeleton = () => {
  const skeletons = Array(10).fill(0);

  return (
    <>
      {skeletons.map((_, index) => (
        <div key={index} className="flex relative w-full h-auto flex-col text-gray-700 cursor-pointer bg-white overflow-hidden transform transition-all border rounded animate-pulse">

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
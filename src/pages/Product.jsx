import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import RelatedProducts from '../components/RelatedProducts';
import LoadingSpinner from '../components/LoadingSpinner';
import { assets } from '../assets/assets';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  // Memoized product data
  const productData = useMemo(
    () => products.find((item) => item._id === productId),
    [productId, products]
  );

  useEffect(() => {
    if (productData) {
      setImage(productData.image[0]);
    }
  }, [productData]);

  if (!productData) {
    return <LoadingSpinner />;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Product Details */}
      <div className="flex flex-col sm:flex-row sm:gap-12 gap-8">
        {/* Product Images */}
        <div className="flex-1 flex flex-col sm:flex-row gap-4">
          {/* Thumbnails */}
          <div className="sm:flex sm:flex-col overflow-x-auto sm:overflow-y-auto sm:w-[20%] flex gap-4 p-2">
            {productData.image.map((item, index) => (
              <LazyLoadImage
                key={index}
                onClick={() => setImage(item)}
                src={item}
                className="w-24 sm:w-full sm:h-24 aspect-square cursor-pointer border border-gray-300 hover:opacity-80 transition-opacity rounded object-cover"
                alt={`Thumbnail ${index + 1}`}
                effect="blur"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[80%] flex items-center justify-center">
            <div className="aspect-square w-full border border-gray-200 rounded overflow-hidden">
              <LazyLoadImage
                src={image}
                className="w-full h-full object-contain"
                alt="Selected Product"
                effect="blur"
              />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <img key={index} src={assets.star_icon} className="w-4" alt="Star Icon" />
            ))}
            <img src={assets.star_dull_icon} className="w-4" alt="Dull Star Icon" />
            <p className="pl-2 text-gray-600">(122)</p>
          </div>
          <div className="flex gap-5 mt-5">
            <p className="text-xl text-gray-400 line-through">
              {currency} {productData.oldPrice}
            </p>
            <p className="text-xl font-semibold text-primary">
              {currency} {productData.newPrice}
            </p>
          </div>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

          {productData.sizes.length > 0 && (
            <div className="mt-8">
              <p className="text-sm font-medium">Select Size</p>
              <div className="flex gap-2 mt-2">
                {productData.sizes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`py-2 px-4 border bg-gray-100 transition-colors ${
                      item === size ? 'border-orange-500 bg-orange-50' : ''
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 mt-6 text-sm hover:bg-gray-800 transition-colors"
          >
            ADD TO CART
          </button>

          <hr className="mt-8" />
          <div className="text-sm text-gray-500 mt-5">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Product Description and Reviews */}
      <div className="mt-20">
        <div className="flex">
          <b className="border-t border-l px-5 py-3 text-sm cursor-pointer">Description</b>
          <p className="border px-5 border-b-0 py-3 text-sm cursor-not-allowed">Reviews (0)</p>
        </div>
        <div className="border px-6 py-6 text-sm text-gray-500 flex flex-col gap-4">
          <p>{productData.description}</p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;



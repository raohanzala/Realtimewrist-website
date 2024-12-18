import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import RelatedProducts from '../components/RelatedProducts';
import LoadingSpinner from '../components/LoadingSpinner';
import Breadcrumb from '../components/Breadcrumb'
import { assets } from '../assets/assets';
import PolicyModal from '../components/PolicyModal';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const Product = () => {
  const { productId } = useParams();
  const { products, currency } = useContext(ShopContext);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); // To track the checkbox state
  const [isLightboxOpen, setIsLightboxOpen] = useState(false); // Lightbox state
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleAddToCartClick = () => {
    setIsModalOpen(true);
  };

  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const productData = useMemo(
    () => products.find((item) => item._id === productId),
    [productId, products]
  );

  // const offer = useMemo(() => Math.floor(((productData.oldPrice - productData.newPrice) / productData.oldPrice) * 100) , [productData?.oldPrice, productData?.newPrice]);

  const breadcrumbs = [
    { label: 'Home', href: '/' }, // Link to home page
    { label: 'Men', href: '/category/men' }, // Link to Men's category
    { label: 'Clothing', href: '/category/men/clothing' }, // Link to Clothing sub-category
    { label: productData?.category, href: `/category/men/clothing/${productData?.category}` }, // Dynamic category (like T-Shirts)
    { label: productData?.name } // Current product, no href
  ];

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
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-12 gap-8 ">
        <div className="flex flex-col gap-4 ">
          <div
            className="w-full relative h-full max-h-[400px] md:max-h-[400px] lg:max-h-[500px] aspect-square border  border-gray-200 rounded overflow-hidden cursor-pointer flex justify-start items-center"
            onClick={() => {
              setIsLightboxOpen(true);
              setPhotoIndex(0);
            }}
          >
            {productData?.oldPrice && productData?.oldPrice > productData?.newPrice && (
              <div className="absolute top-2 left-2 bg-red-500 flex items-center justify-center shadow-md text-white size-11 text-sm font-bold z-10 rounded-full">
                -{Math.floor(((productData.oldPrice - productData.newPrice) / productData.oldPrice) * 100)}%
              </div>
            )}
            <LazyLoadImage
              src={image}
              className="w-full h-full object-cover "
              alt="Selected Product"
              effect="blur"
            />
          </div>
          <div className="overflow-x-auto  sm:overflow-y-auto flex gap-4">
            {productData.image.map((item, index) => (
              <LazyLoadImage
                key={index}
                onClick={() => setImage(item)}
                src={item}
                className={`size-24 cursor-pointer rounded object-cover object-center transition-all duration-300 ease-in-out 
                  ${image === item ? 'shadow-lg' : 'border-gray-300 grayscale opacity-70 hover:opacity-100 hover:grayscale-0'}
                `}
                alt={`Thumbnail ${index + 1}`}
                effect="blur"
              />
            ))}
          </div>

          {isLightboxOpen && (
            <Lightbox
              mainSrc={productData.image[photoIndex]}
              nextSrc={productData.image[(photoIndex + 1) % productData.image.length]}
              prevSrc={productData.image[(photoIndex + productData.image.length - 1) % productData.image.length]}
              onCloseRequest={() => setIsLightboxOpen(false)}
              onMovePrevRequest={() =>
                setPhotoIndex((photoIndex + productData.image.length - 1) % productData.image.length)
              }
              onMoveNextRequest={() =>
                setPhotoIndex((photoIndex + 1) % productData.image.length)
              }
            />
          )}
        </div>

        <div className="">
          <h1 className="font-medium text-2xl uppercase">{productData.name}</h1>
          <div className="flex items-center gap-3 mt-5">
            {productData?.oldPrice && productData.oldPrice > productData.newPrice && (
              <p className="text-lg text-gray-500 line-through">
                <span className=" py-1 px-2 rounded-md">
                  {currency} {productData.oldPrice}
                </span>
              </p>
            )}
            <p className="text-2xl font-bold text-primary">
              {currency} {productData.newPrice}
            </p>
            {productData?.oldPrice && productData?.oldPrice > productData?.newPrice && (
              <p className="bg-red-500 text-white text-xs font-semibold py-1 px-2 rounded-full">
                Save {Math.floor(((productData.oldPrice - productData.newPrice) / productData.oldPrice) * 100)}%
              </p>
            )}
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
                    className={`py-2 px-4 border bg-gray-100 transition-colors ${item === size ? 'border-orange-500 bg-orange-50' : ''
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
          <button
            onClick={handleAddToCartClick}
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

          {isModalOpen && <PolicyModal setIsModalOpen={setIsModalOpen} isCheckboxChecked={isCheckboxChecked} setIsCheckboxChecked={setIsCheckboxChecked} productId={productData._id} size={size} handleCheckboxChange={handleCheckboxChange} />}
        </div>
      </div>

      <div className="mt-20">
        <div className="flex">
          <b className="border-t border-l px-5 py-3 text-sm cursor-pointer">Description</b>
          <p className="border px-5 border-b-0 py-3 text-sm cursor-not-allowed">Reviews (0)</p>
        </div>
        <div className="border px-6 py-6 text-sm text-gray-500 flex flex-col gap-4">
          <p>{productData.description}</p>
        </div>
      </div>

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;


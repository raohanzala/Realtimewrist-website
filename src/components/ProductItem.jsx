import React, { useContext, memo, useMemo, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdCart } from "react-icons/io";
import PolicyModal from './PolicyModal';

const ProductItem = memo(({ id, description, size, image, name, newPrice, oldPrice }) => {
  
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // For modal visibility
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); // To track the checkbox state
  const { currency } = useContext(ShopContext);

  const handleAddToCartClick = (e) => {
    e.stopPropagation(); // Stops the event from bubbling up to parent elements
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const offer = useMemo(() => Math.floor(((oldPrice - newPrice) / oldPrice) * 100), [oldPrice, newPrice]);

  const shortDescription = useMemo(
    () => (description.length > 60 ? description.slice(0, 60) + '...' : description),
    [description]
  );
  const productName = useMemo(
    () => (name.length > 20 ? name.slice(0, 23) + '...' : name),
    [name]
  );

  const hasMultipleImages = image && image.length > 1;

  return (
    <>
    <Link to={`/product/${id}`}>
      <div
        className="flex relative w-full h-auto flex-col text-gray-700 cursor-pointer bg-white overflow-hidden transform transition-all border rounded"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Offer Label */}
        {offer > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 flex items-center justify-center shadow-md text-white w-10 h-10 text-xs font-bold z-10 rounded-full">
            -{offer}%
          </div>
        )}

        {/* Image Section */}
        <div className="relative overflow-hidden aspect-w-1 aspect-h-1 w-full">
          {/* First Image (Default/Always Visible) */}
          <LazyLoadImage
            src={image[0]}
            effect="blur"
            className={`absolute w-full h-full object-cover transition-transform transition-opacity duration-500 ease-in-out ${hasMultipleImages && isHovered ? 'opacity-0 scale-100' : 'opacity-100 scale-100'
              }`}
            style={{
              transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
            }}
            alt={name}
          />
          
          {/* Second Image (Only if hover and multiple images) */}
          {hasMultipleImages && isHovered && (
            <LazyLoadImage
              src={image[1]}
              effect="blur"
              className={`absolute w-full h-full object-cover transition-transform transition-opacity duration-500 ease-in-out ${isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
                }`}
              style={{
                transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
              }}
              alt={name}
            />
          )}
        </div>
        {/* Product Details */}
        <div className={`text-center relative py-3 px-2`}>
          <div
            className={`absolute duration-200 transition-all z-40 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'
              } -top-9 left-0 bg-primary hover:bg-button-cta py-2 flex items-center justify-center gap-1 text-white font-semibold text-xs uppercase w-full`}
              onClick={handleAddToCartClick}
          >
          <IoMdCart className='text-xl' />  Add to cart
          </div>
          <p className="text-sm tracking-wide font-semibold uppercase mb-1 text-gray-800">{productName}</p>
          <p className="text-xs text-gray-500">{shortDescription}</p>
          <div className="flex gap-2 justify-center items-center mt-2">
            {oldPrice && oldPrice > newPrice && (
              <p className="text-sm text-gray-400 line-through">
                {currency} {oldPrice}
              </p>
            )}
            <p className="text-lg font-semibold text-primary">
              {currency} {newPrice}
            </p>
          </div>
        </div>
      </div>
    </Link>
      {isModalOpen && <PolicyModal setIsModalOpen={setIsModalOpen} isCheckboxChecked={isCheckboxChecked} setIsCheckboxChecked={setIsCheckboxChecked} productId={id} size={size} handleCheckboxChange={handleCheckboxChange} />}
    </>
  );
});

export default ProductItem;

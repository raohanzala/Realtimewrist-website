import React, { useContext, memo, useMemo, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { IoMdCart } from "react-icons/io";
import PolicyModal from './PolicyModal';
import { formatAmount } from '../helpers';
import { CURRENCY } from '../utils/contants';
import Modal from './Modal';

const ProductItem = memo(({ id, description, images, name, newPrice, oldPrice, availability }) => {

  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const product = {
    _id: id, description, images, name, newPrice, oldPrice, availability
  }

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCheckboxChange = (e) => setIsCheckboxChecked(e.target.checked);

  const offer = useMemo(() => Math.floor(((oldPrice - newPrice) / oldPrice) * 100), [oldPrice, newPrice]);

  const shortDescription = useMemo(
    () => (description.length > 60 ? description.slice(0, 60) + '...' : description),
    [description]
  );
  const productName = useMemo(
    () => (name.length > 20 ? name.slice(0, 23) + '...' : name),
    [name]
  );

  const hasMultipleImages = images && images.length > 1;

  return (
    <>
      <Link to={`/product/${id}`}>
        <div
          className="flex relative w-full h-auto flex-col text-gray-700 cursor-pointer bg-white overflow-hidden transform transition-all border rounded"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {offer > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 flex items-center justify-center shadow-md text-white w-10 h-10 text-xs font-bold z-10 rounded-full">
              -{offer}%
            </div>
          )}

          <div className={`relative overflow-hidden aspect-w-1 aspect-h-1 w-full ${availability === 'Out of stock'}`}>
            {availability === 'Out of stock' && (
              <div className="absolute top-[50%] -translate-y-[50%] left-0 bg-[hsla(0,0%,100%,.9)] py-3 h-fit flex items-center justify-center z-20">
                <p className="text-[#333] font-bold sm:text-base text-sm uppercase tracking-wide">Not Available</p>
              </div>
            )}
            <LazyLoadImage
              src={images?.[0]}
              effect="blur"
              className={`absolute w-full h-full object-cover  transition-all duration-500 ease-in-out ${hasMultipleImages && availability === 'In stock' && isHovered ? 'opacity-0 scale-100' : 'opacity-100 scale-100'} ${availability === 'Out of stock' ? 'opacity-50' : ''}`}
              style={{
                transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
              }}
              alt={name}
            />

            {hasMultipleImages && isHovered && (
              <LazyLoadImage
                src={images[1]}
                effect="blur"
                className={`absolute w-full h-full object-cover transition-all duration-500 ease-in-out ${isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
                  }`}
                style={{
                  transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
                }}
                alt={name}
              />
            )}
          </div>
          <div className={`text-center relative py-3 px-2 z-10 ${availability === 'Out of stock' ? 'opacity-75' : ''}`}>

            <button
              disabled={availability === 'Out of stock'}
              className={`absolute duration-200 disabled:cursor-not-allowed z-20 transition-all ease-in-out ${isHovered ? 'opacity-100 ' : 'opacity-0'
                } -top-9 left-0 bg-primary-1 hover:bg-primary-2 py-2 flex items-center justify-center gap-1 text-white font-semibold text-xs uppercase w-full`}
              onClick={handleAddToCartClick}
            >
              <IoMdCart className='text-xl' />  Add to cart
            </button>
            <p className="text-sm tracking-wide font-semibold uppercase mb-1 text-gray-800 truncate">{productName}</p>
            <p className="text-xs text-gray-500 hover:underline">{shortDescription}</p>
            <div className="flex gap-2 justify-center items-center mt-2">
              {oldPrice && oldPrice > newPrice && (
                <p className="text-xs sm:text-sm text-gray-400 line-through">
                  {CURRENCY}{formatAmount(oldPrice)}
                </p>
              )}
              <p className="text-sm sm:text-lg font-semibold text-primary-1">
                {CURRENCY}{formatAmount(newPrice)}
              </p>
            </div>
          </div>
        </div>
      </Link>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <PolicyModal setIsModalOpen={setIsModalOpen} isCheckboxChecked={isCheckboxChecked} setIsCheckboxChecked={setIsCheckboxChecked} product={product} handleCheckboxChange={handleCheckboxChange} />
      </Modal>
    </>
  );
});

export default ProductItem;

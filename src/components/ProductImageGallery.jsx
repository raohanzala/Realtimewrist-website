import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ProductImageGallery = ({ image, setImage , singleProduct}) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false); // Lightbox state
  const [photoIndex, setPhotoIndex] = useState(0);

  // const images = productData.image.map((item) => ({
  //   original: item,
  //   thumbnail: item,
  //   description: "Product Image",
  // }));

  return (
    <div className="flex flex-col gap-4 ">
          <div
            className="w-full relative h-full max-h-[400px] md:max-h-[400px] lg:max-h-[500px] aspect-square border  border-gray-200 rounded overflow-hidden cursor-pointer flex justify-start items-center"
            onClick={() => {
              setIsLightboxOpen(true);
              setPhotoIndex(0);
            }}
          >
            {singleProduct?.oldPrice && singleProduct?.oldPrice > singleProduct?.newPrice && (
              <div className="absolute top-2 left-2 bg-red-500 flex items-center justify-center shadow-md text-white size-11 text-sm font-bold z-10 rounded-full">
                -{Math.floor(((singleProduct.oldPrice - singleProduct.newPrice) / singleProduct.oldPrice) * 100)}%
              </div>
            )}
            <LazyLoadImage
              src={image}
              className="w-full h-full object-cover "
              alt="Selected Product"
              effect="blur"
            />
          </div>
          <div className="overflow-x-auto sm:overflow-y-auto flex gap-4">
            {singleProduct.images.map((item, index) => (
              <LazyLoadImage
                key={index}
                onClick={() => setImage(item)}
                src={item}
                className={`size-24  cursor-pointer rounded p-[2px] border-white border-2 object-cover object-center transition-all duration-300 ease-in-out
                  ${image === item ? ' border-primary-1' : 'shadow-lg'}
                `}
                alt={`Thumbnail ${index + 1}`}
                effect="blur"
              />
            ))}
          </div>

          {isLightboxOpen && (
            <Lightbox
              mainSrc={singleProduct.images[photoIndex]}
              nextSrc={singleProduct.images[(photoIndex + 1) % singleProduct.images.length]}
              prevSrc={singleProduct.images[(photoIndex + singleProduct.images.length - 1) % singleProduct.images.length]}
              onCloseRequest={() => setIsLightboxOpen(false)}
              onMovePrevRequest={() =>
                setPhotoIndex((photoIndex + singleProduct.images.length - 1) % singleProduct.images.length)
              }
              onMoveNextRequest={() =>
                setPhotoIndex((photoIndex + 1) % singleProduct.images.length)
              }
            />
          )}
        </div>
  );
};

export default ProductImageGallery;

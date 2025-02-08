import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

const ProductImageGallery = ({ product }) => {
  const [image, setImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setImage(product.images[0]);
    }
  }, [product]);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image (Click to Open Lightbox) */}
      <div
        className="w-full relative h-full max-h-[400px] md:max-h-[400px] lg:max-h-[500px] aspect-square border border-gray-200 rounded overflow-hidden cursor-pointer flex justify-start items-center"
        onClick={() => setIsOpen(true)}
      >
        {product?.oldPrice && product?.oldPrice > product?.newPrice && (
          <div className="absolute top-2 left-2 bg-red-500 flex items-center justify-center shadow-md text-white size-11 text-sm font-bold z-10 rounded-full">
            -{Math.floor(((product.oldPrice - product.newPrice) / product.oldPrice) * 100)}%
          </div>
        )}
        <LazyLoadImage
          src={image}
          className="w-full h-full object-cover"
          alt="Selected Product"
          effect="blur"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex items-center gap-4">
        {product.images.map((item, index) => (
          <LazyLoadImage
            key={index}
            onClick={() => {
              setImage(item);
              setPhotoIndex(index);
            }}
            src={item}
            className={`size-20 cursor-pointer rounded p-[2px] border-2 object-cover object-center transition-all duration-300 ease-in-out
              ${image === item ? "border-primary-1 border-2" : "shadow-sm "}
            `}
            alt={`Thumbnail ${index + 1}`}
            effect="blur"
          />
        ))}
      </div>

      {/* Modern Lightbox */}
      {isOpen && (
        <Lightbox
          open={isOpen}
          close={() => setIsOpen(false)}
          index={photoIndex}
          slides={product.images.map((img) => ({ src: img }))}
          plugins={[Fullscreen, Zoom, Thumbnails]}
        />
      )}
    </div>
  );
};

export default ProductImageGallery;

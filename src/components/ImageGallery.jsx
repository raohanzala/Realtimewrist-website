import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

const ImageGallery = ({ images, photoIndex , isLightboxOpen, setIsLightboxOpen}) => {
  // const [photoIndex, setPhotoIndex] = useState(0);
  // const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <>
      {/* Main Image - Click to Open Lightbox */}
      <div
        className="w-full relative h-full max-h-[400px] md:max-h-[400px] lg:max-h-[500px] aspect-square border border-gray-200 rounded overflow-hidden cursor-pointer flex justify-start items-center"
        // onClick={() => setIsLightboxOpen(true)}
      >
        {/* <LazyLoadImage
          src={images[photoIndex]}
          className="w-full h-full object-cover"
          alt="Selected Product"
          effect="blur"
        /> */}
      </div>

      {/* Thumbnail Images */}
      {/* <div className="overflow-x-auto flex gap-4 mt-4">
        {images.map((item, index) => (
          <LazyLoadImage
            key={index}
            onClick={() => setPhotoIndex(index)}
            src={item}
            className={`size-24 cursor-pointer rounded p-[2px] border-2 object-cover object-center transition-all duration-300 ease-in-out ${
              photoIndex === index ? "border-primary-1 border-2" : "shadow-sm"
            }`}
            alt={`Thumbnail ${index + 1}`}
            effect="blur"
          />
        ))}
      </div> */}

      {/* Modern Lightbox */}
      {isLightboxOpen && (
        <Lightbox
          open={isLightboxOpen}
          close={() => setIsLightboxOpen(false)}
          index={photoIndex}
          slides={images.map((img) => ({ src: img }))}
          plugins={[Fullscreen, Zoom, Thumbnails]}
        />
      )}
    </>
  );
};

export default ImageGallery;

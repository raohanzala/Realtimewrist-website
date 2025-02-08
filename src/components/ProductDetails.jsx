import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { BsWhatsapp } from "react-icons/bs";
import { formatAmount } from "../helpers";
import { CURRENCY } from "../utils/contants";
import Button from "./Button";

const ProductDetails = ({ productData, handleAddToCartClick }) => {
  return (
    <div>
      <h1 className="font-medium text-2xl uppercase">{productData?.name}</h1>
      <div className="flex items-center gap-3 mt-5">
        {productData?.oldPrice &&
          productData.oldPrice > productData?.newPrice && (
            <p className="text-lg text-gray-500 line-through">
              <span className=" py-1 px-2 rounded-md">
                {CURRENCY}
                {formatAmount(productData?.oldPrice)}
              </span>
            </p>
          )}
        <p className="text-2xl font-bold text-primary-1">
          {CURRENCY}
          {formatAmount(productData?.newPrice)}
        </p>
        {productData?.oldPrice &&
          productData?.oldPrice > productData?.newPrice && (
            <p className="bg-red-500 text-white text-xs font-semibold py-1 px-2 rounded-full">
              Save{" "}
              {Math.floor(
                ((productData.oldPrice - productData.newPrice) /
                  productData.oldPrice) *
                  100
              )}
              %
            </p>
          )}
      </div>
      <p className="mt-5 text-gray-500 md:w-4/5">{productData?.description}</p>
      <div className="flex items-center gap-5 mt-5">
        <Button
          onClick={handleAddToCartClick}
          variant='primaryBig'
        >
         ADD TO CART
          {/* {!isSubmitting ? (productToEdit ? "Update Product" : "Add Product") : <SpinnerMini />} */}
        </Button>
        <Button onClick={handleAddToCartClick} variant="secondary"  className="bg-primary-1 py-3 px-8 text-sm uppercase text-white">
          Order Now
        </Button>
      </div>
      <hr className="mt-8" />
      <div className="py-6 flex gap-2 items-center">
        <BsWhatsapp size={25} />
        Order via WhatsApp : 03278272361
      </div>
      <hr className="" />
      <div className="text-sm text-gray-500 mt-5">
        <p>100% same as pictures.</p>
        <p>Cash on delivery is available on this product.</p>
        <p>Easy return and exchange policy within 7 days.</p>
      </div>
    </div>
  );
};

export default ProductDetails;

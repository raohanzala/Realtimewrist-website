import { useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import RelatedProducts from "../components/RelatedProducts";
import Spinner from "../components/Spinner";
import Breadcrumb from "../components/Breadcrumb";
import PolicyModal from "../components/PolicyModal";
import ProductImageGallery from "../components/ProductImageGallery";
import ProductDetails from "../components/ProductDetails";
import { useProduct } from "../api/useProduct";
import Modal from "../components/Modal";

const Product = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  console.log(isModalOpen, 'MODALOPEN')

  const { product, isPending, error } = useProduct();

  const handleAddToCartClick = (e) => {
    e.stopPropagation()
    setIsModalOpen(true);
  };

  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: product?.category?.name, href: `/category/${product?.category.name}/${product?.category._id}` },
    { label: product?.name },
  ];

  if (isPending || !product) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        {" "}
        <Spinner size={30} variant="secondary" />
      </div>
    );
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-12 gap-8 ">
        <ProductImageGallery product={product} />

        <ProductDetails
          productData={product}
          handleAddToCartClick={handleAddToCartClick}
        />
        <Modal isOpen={isModalOpen} onClose={()=> setIsModalOpen(false)}>
          <PolicyModal
            setIsModalOpen={setIsModalOpen}
            isCheckboxChecked={isCheckboxChecked}
            setIsCheckboxChecked={setIsCheckboxChecked}
            product={product}
            handleCheckboxChange={handleCheckboxChange}
          />
        </Modal>
      </div>

      <div className="mt-20">
        <div className="flex">
          <b className="border-t border-l px-5 py-3 text-sm cursor-pointer">
            Description
          </b>
          <p className="border px-5 border-b-0 py-3 text-sm cursor-not-allowed">
            Reviews (0)
          </p>
        </div>
        <div className="border px-6 py-6 text-sm text-gray-500 flex flex-col gap-4">
          <p>{product?.description}</p>
        </div>
      </div>

      <RelatedProducts
        category={product?.category.name}
        gender={product?.gender}
      />
    </div>
  );
};

export default Product;

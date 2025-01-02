import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import 'react-lazy-load-image-component/src/effects/blur.css';
import RelatedProducts from '../components/RelatedProducts';
import Spinner from '../components/Spinner';
import Breadcrumb from '../components/Breadcrumb'
import PolicyModal from '../components/PolicyModal';
import 'react-image-lightbox/style.css';
import ProductImageGallery from '../components/ProductImageGallery';
import ProductDetails from '../components/ProductDetails';


const Product = () => {
  const { productId } = useParams();
  const { singleProduct, getSingleProduct } = useContext(ShopContext);
  const [image, setImage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false); 


  const handleAddToCartClick = () => {
    setIsModalOpen(true);
  };

  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  console.log(singleProduct, 'SINGLE')

  // const productData = useMemo(
  //   () => products.find((item) => item._id === productId),
  //   [productId, products]
  // );

  useEffect(() => {
    getSingleProduct(productId)
  }, [])

  // const offer = useMemo(() => Math.floor(((productData.oldPrice - productData.newPrice) / productData.oldPrice) * 100) , [productData?.oldPrice, productData?.newPrice]);

  const breadcrumbs = [
    { label: 'Home', href: '/' }, // Link to home page
    { label: 'Men', href: '/category/men' }, // Link to Men's category
    { label: 'Clothing', href: '/category/men/clothing' }, // Link to Clothing sub-category
    { label: singleProduct?.category, href: `/category/men/clothing/${singleProduct?.category}` }, // Dynamic category (like T-Shirts)
    { label: singleProduct?.name } // Current product, no href
  ];
  console.log(singleProduct?.images, 'PRODUCTIMAGE')

  useEffect(() => {
    if (singleProduct) {
      setImage(singleProduct.images[0]);
    }
  }, [singleProduct]);

  if (!singleProduct) {
    return <Spinner />;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <Breadcrumb breadcrumbs={breadcrumbs} />
      <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-12 gap-8 ">
        <ProductImageGallery setImage={setImage} image={image} singleProduct={singleProduct}/>

        <ProductDetails productData={singleProduct} handleAddToCartClick={handleAddToCartClick} />

        {isModalOpen && <PolicyModal setIsModalOpen={setIsModalOpen} isCheckboxChecked={isCheckboxChecked} setIsCheckboxChecked={setIsCheckboxChecked} productId={singleProduct._id} handleCheckboxChange={handleCheckboxChange} />}
      </div>

      <div className="mt-20">
        <div className="flex">
          <b className="border-t border-l px-5 py-3 text-sm cursor-pointer">Description</b>
          <p className="border px-5 border-b-0 py-3 text-sm cursor-not-allowed">Reviews (0)</p>
        </div>
        <div className="border px-6 py-6 text-sm text-gray-500 flex flex-col gap-4">
          <p>{singleProduct.description}</p>
        </div>
      </div>

      <RelatedProducts category={singleProduct.category} subCategory={singleProduct.subCategory} />
    </div>
  );
};

export default Product;


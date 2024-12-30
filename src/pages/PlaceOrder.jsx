import React, { useState, useContext } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import Button from '../components/Button';
import Input from '../components/Input';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^\d+$/, 'Phone number must be numeric'),
  whatsapp: Yup.string()
    .required('WhatsApp number is required')
    .matches(/^\d+$/, 'WhatsApp number must be numeric'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  street: Yup.string().required('Street is required'),
  city: Yup.string().required('City is required'),
  zipcode: Yup.string()
    .required('Zipcode is required')
    .matches(/^\d+$/, 'Zipcode must be numeric'),
  country: Yup.string().required('Country is required'),
  note: Yup.string(),
});

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const {
    cartItems,
    setCartItems,
    delivery_fee,
    getCartAmount,
    backendUrl,
    products,
    token,
    navigate,
  } = useContext(ShopContext);

  const order = async (orderData) => {
    try {
      const response = await axios.post(
        backendUrl + '/api/order/place',
        orderData,
        { headers: { token } }
      );
      console.log(response);
      if (response.data.success) {
        setCartItems({});
        navigate('/orders');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.data.message);
    }
  };

  const onSubmitHandler = async (values) => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    try {
      console.log('WORK')
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: values,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      console.log(orderData, 'OrderData');

      switch (method) {
        case 'cod':
          order(orderData);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        phone: '',
        whatsapp: '',
        email: '',
        street: '',
        city: '',
        zipcode: '',
        country: '',
        note: '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmitHandler}
    >
      {({ values, handleChange, handleSubmit }) => (
        <Form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] justify-between gap-10 sm:gap-5 pt-5 px-5 sm:pt-14 min-h-[80vh] border-t max-w-[1280px] mx-auto"
        >
          {/* --------- Left Side ----------- */}
          <div className="flex flex-col w-full my-5">
            <Title text1={"DELIVERY"} text2={"INFORMATION"} />
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              <Input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Email address"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                name="phone"
                value={values.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
              <Input
                type="number"
                name="whatsapp"
                value={values.whatsapp}
                onChange={handleChange}
                placeholder="Enter WhatsApp number"
              />
            </div>
            <Input
              type="text"
              name="city"
              value={values.city}
              onChange={handleChange}
              placeholder="City"
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                name="zipcode"
                value={values.zipcode}
                onChange={handleChange}
                placeholder="Zipcode"
              />
              <Input
                type="text"
                name="country"
                value={values.country}
                onChange={handleChange}
                placeholder="Country"
              />
            </div>
            <div>

            <textarea
              name="note"
              value={values.note}
              onChange={handleChange}
              rows={4}
              className="border border-gray-300 focus:border-primary-1 focus:outline-none rounded-sm py-1.5 px-3.5 w-full"
              placeholder="Additional Information about your order or product."
            ></textarea>
                        <ErrorMessage name="note" component="div" className="text-red-500 text-sm" />

              </div>
          </div>

          {/* ------------ Right Side ------------------- */}
          <div className="mt-8">
            <div className="mt-8">
              <CartTotal />
            </div>
            <div className="mt-12">
              <Title text1={"PAYMENT"} text2={"METHOD"} />
              {/* ------------ Payment Method Selection ------------- */}
              <div className="flex gap-3 flex-col lg:flex-row">
                <div
                  onClick={() => setMethod('cod')}
                  className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
                >
                  <p
                    className={`min-w-3.5 h-3.5 border rounded-full ${
                      method === 'cod' ? 'bg-green-400' : ''
                    }`}
                  ></p>
                  <p className="text-gray-500 text-sm font-medium mx-4">
                    CASH ON DELIVERY
                  </p>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <button type="submit" variant="primaryBig">
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PlaceOrder;

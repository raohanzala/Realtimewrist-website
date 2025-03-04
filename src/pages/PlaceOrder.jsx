import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import toast from "react-hot-toast";
import Button from "../components/Button";
import Input from "../components/Input";
import Spinner from "../components/Spinner";
import FormRowVerticle from "../components/FormRowVerticle";
import { useDispatch, useSelector } from "react-redux";
import { usePlaceOrder } from "../api/usePlaceOrder";
import { useNavigate } from "react-router-dom";
import { clearFormData, saveFormData } from "../store/slices/orderSlice";
import Modal from "../components/Modal";
import ConfirmOrderModal from "../components/ConfirmOrderModal";
import Breadcrumb from "../components/Breadcrumb";
import { DELIVERY_FEE } from "../utils/contants";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must be numeric")
    .trim(),
  whatsapp: Yup.string()
    .required("WhatsApp number is required")
    .matches(/^\d+$/, "WhatsApp number must be numeric")
    .trim(),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  city: Yup.string().required("City is required"),
  address: Yup.string()
    .required("Address is required"),
  country: Yup.string().required("Country is required"),
  note: Yup.string().nullable(),
});

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const {items, totalValue} = useSelector((state)=> state.cart)
  const {isLoggedIn} = useSelector((state)=> state.user)
  const { formData } = useSelector((state) => state.order); 

  const {placeOrder, isPending, orderSuccess, setOrderSuccess}  = usePlaceOrder()

  const order = async (values) => {

    let orderData = {
      address: values,
      items: items,
      amount: totalValue + DELIVERY_FEE,
    };

    await placeOrder(orderData)
    dispatch(clearFormData());
  };

  const onSubmitHandler = async (values) => {
    console.log("onSubmitHandler triggered");

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!isLoggedIn) {
      dispatch(saveFormData(values));
      toast.error('Please login to continue.')
      navigate("/login", { state: { from: "/place-order" } });
      return; 
    }

    try {
      switch (method) {
        case "cod":
          order(values);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Cart' }
  ];

  return (
    <>
    <Formik
      initialValues={{
        name: formData?.name || "",
        phone: formData?.phone || "",
        whatsapp: formData?.whatsapp || "",
        email: formData?.email || "",
        city: formData?.city || "",
        address: formData?.address || "",
        country: formData?.country || "Pakistan",
        note: formData?.note || "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Formik onSubmit called", values);
        onSubmitHandler(values);
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <>

          <Form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] justify-between gap-5 sm:gap-5 pt-5 px-5 sm:pt-14 border-t max-w-[1280px] mx-auto"
          >

            <div className="flex flex-col w-full">
        <Breadcrumb breadcrumbs={breadcrumbs} />
              <Title className='mb-5' text1={"DELIVERY"} text2={"INFORMATION"} />
              <div className="grid sm:grid-cols-2 grid-cols-1 sm:gap-3">
                <FormRowVerticle name="name">
                  <Input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    disabled={isPending}
                    placeholder="Enter your name"
                  />
                </FormRowVerticle>
                <FormRowVerticle name="email">
                  <Input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    disabled={isPending}
                    placeholder="Email address"
                  />
                </FormRowVerticle>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <FormRowVerticle name="phone">
                  <Input
                    type="number"
                    name="phone"
                    value={values.phone}
                    disabled={isPending}
                    onChange={handleChange}
                    placeholder="Phone number"
                  />
                </FormRowVerticle>
                <FormRowVerticle name="whatsapp">
                  <Input
                    type="number"
                    name="whatsapp"
                    value={values.whatsapp}
                    onChange={handleChange}
                    disabled={isPending}
                    placeholder="WhatsApp number"
                  />
                </FormRowVerticle>
              </div>
              <FormRowVerticle name="address">
                <Input
                  type="text"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  disabled={isPending}
                  placeholder="Address"
                />
              </FormRowVerticle>
              <div className="grid grid-cols-2 gap-3">
                <FormRowVerticle name="city">
                  <Input
                    type="text"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    disabled={isPending}
                    placeholder="City"
                  />
                </FormRowVerticle>
                <FormRowVerticle name="country">
                  <Input
                    type="text"
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                    disabled={isPending}
                    placeholder="Country"
                  />
                </FormRowVerticle>
              </div>
              <div>
                <FormRowVerticle name="note">
                  <Input
                    name="note"
                    value={values.note}
                    onChange={handleChange}
                    disabled={isPending}
                    as="textarea"
                    rows={4}
                    className="border border-gray-300 rounded-sm py-1.5 px-3.5 w-full"
                    placeholder="Additional Information about your order or product (optional)."
                  />
                </FormRowVerticle>
              </div>
            </div>

            <div>
              <div className="mt-12">
                <CartTotal />
              </div>
              <div className="mt-12">
                <Title className='mb-3' size="small" text1={"PAYMENT"} text2={"METHOD"} />
                <div className="flex gap-3 flex-col lg:flex-row">
                  <div
                    onClick={() => setMethod("cod")}
                    className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
                  >
                    <p
                      className={`min-w-3.5 h-3.5 border rounded-full ${
                        method === "cod" ? "bg-green-400" : ""
                      }`}
                    ></p>
                    <p className="text-gray-500 text-sm font-medium mx-4">
                      CASH ON DELIVERY
                    </p>
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <Button type="submit" variant="primaryBig">
                    {!isPending ? "PLACE ORDER" : <Spinner />}
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </>
      )}
    </Formik>
    <Modal isOpen={orderSuccess} onClose={setOrderSuccess}>
      <ConfirmOrderModal/>
    </Modal>
    </>
  );
};

export default PlaceOrder;
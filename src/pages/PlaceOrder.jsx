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
import { DELIVERY_FEE } from "../utils/contants";
import { useSelector } from "react-redux";
import { usePlaceOrder } from "../api/usePlaceOrder";

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
  zipcode: Yup.string()
    .required("Zipcode is required")
    .matches(/^\d+$/, "Zipcode must be numeric")
    .trim(),
  country: Yup.string().required("Country is required"),
  note: Yup.string().nullable(),
});

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");

  const {items} = useSelector((state)=> state.cart)
  const {placeOrder}  = usePlaceOrder()


  console.log(items, 'ORDERDATA')
  const order = async (values) => {

    let orderData = {
      address: values,
      items: items,
      amount: DELIVERY_FEE ,
    };

    console.log(orderData)
    placeOrder(orderData)
  };

  const onSubmitHandler = async (values) => {
    console.log("onSubmitHandler triggered");

    if (items.length === 0) {
      toast.error("Your cart is empty");
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

  return (
    <Formik
      initialValues={{
        name: "",
        phone: "",
        whatsapp: "",
        email: "",
        street: "",
        city: "",
        zipcode: "",
        country: "",
        note: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Formik onSubmit called", values);
        onSubmitHandler(values);
      }}
    >
      {({ values, handleChange, isSubmitting, handleSubmit }) => (
        <>
          <Form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] justify-between gap-10 sm:gap-5 pt-5 px-5 sm:pt-14 border-t max-w-[1280px] mx-auto"
          >
            {/* --------- Left Side ----------- */}
            <div className="flex flex-col w-full my-5">
              <Title text1={"DELIVERY"} text2={"INFORMATION"} />
              <div className="grid grid-cols-2 gap-3">
                <FormRowVerticle name="name">
                  <Input
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="Enter your name"
                  />
                </FormRowVerticle>
                <FormRowVerticle name="email">
                  <Input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                    placeholder="WhatsApp number"
                  />
                </FormRowVerticle>
              </div>
              <FormRowVerticle name="city">
                <Input
                  type="text"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  placeholder="City"
                />
              </FormRowVerticle>
              <div className="grid grid-cols-2 gap-3">
                <FormRowVerticle name="zipcode">
                  <Input
                    type="number"
                    name="zipcode"
                    value={values.zipcode}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    placeholder="Zipcode"
                  />
                </FormRowVerticle>
                <FormRowVerticle name="country">
                  <Input
                    type="text"
                    name="country"
                    value={values.country}
                    onChange={handleChange}
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                    as="textarea"
                    rows={4}
                    className="border border-gray-300 rounded-sm py-1.5 px-3.5 w-full"
                    placeholder="Additional Information about your order or product (optional)."
                  />
                </FormRowVerticle>
              </div>
            </div>

            <div className="mt-8">
              <div className="mt-8">
                <CartTotal />
              </div>
              <div className="mt-12">
                <Title text1={"PAYMENT"} text2={"METHOD"} />
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
                    {!isSubmitting ? "PLACE ORDER" : <Spinner />}
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
};

export default PlaceOrder;
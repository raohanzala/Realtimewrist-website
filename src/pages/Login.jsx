import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useSignIn } from "../api/useSignIn";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { addToCart, closeCart } from "../store/slices/cartSlice";
import axiosInstance from "../api/axiosInstance";
import { assets } from "../assets/assets";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import FormRowVerticle from "../components/FormRowVerticle";
import Input from "../components/Input";
import { useSignUp } from "../api/useSignUp";

const signUpSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const loginSchema = Yup.object({
  email: Yup.string().required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { signIn, isPending: isSigningIn } = useSignIn();
  const { signUp, isPending: isSigningUp } = useSignUp();

  const { isLoggedIn } = useSelector((state) => state.user);

  const handleUserCart = async () => {
    try {
      const { data } = await axiosInstance.get("/cart/get");
      dispatch(addToCart(data.cartData));
      dispatch(closeCart());
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch cart data");
    }
  };

  const onSubmitHandler = async (values) => {
    try {
      if (currentState === "Sign Up") {
        signUp(values);
      } else {
        signIn(
          { email: values.email, password: values.password },
          {
            onSuccess: async (data) => {
              if (data.success) {
                await handleUserCart();
              }
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo, { replace: true });
    }
  }, [isLoggedIn, navigate, location.state]);

  return (
    <div className="px-5">

    <Formik
      initialValues={
        currentState === "Login"
          ? { email: "", password: "" }
          : { name: "", email: "", password: "" }
      }
      validationSchema={currentState === "Login" ? loginSchema : signUpSchema}
      onSubmit={(values) => onSubmitHandler(values)}
    >
      {({ values, handleChange, isSubmitting, handleSubmit }) => (
        <Form
          onSubmit={handleSubmit}
          className="flex flex-col items-center max-w-96 border bg-white text-gray-800 shadow-lg rounded m-auto mt-20 sm:py-10 py-8 sm:px-8 px-4"
        >
          <img src={assets.logo2} alt="Logo" className="w-[50%] m-auto mb-3" />

          <p className="text-4xl mb-5">{currentState}</p>

          {currentState === "Sign Up" && (
            <FormRowVerticle name="name" label="Name">
              <Input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Name"
                size="large"
              />
            </FormRowVerticle>
          )}

          <FormRowVerticle name="email" label="Email">
            <Input
              type="email"
              name="email"
              size="large"
              value={values.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </FormRowVerticle>

          <FormRowVerticle name="password" label="Password">
            <Input
              type="password"
              name="password"
              size="large"
              value={values.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </FormRowVerticle>

          <div className="w-full flex justify-end text-sm my-3">
            <p
              onClick={() =>
                setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
              }
              className="cursor-pointer"
            >
               {currentState === "Login"
      ? "Don't have an account? Sign up"
      : "Already have an account? Login here"}
            </p>
          </div>

          <Button className="w-full py-3" type="submit">
            {isSigningIn || isSigningUp || isSubmitting ? (
              <Spinner />
            ) : currentState === "Login" ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </Button>
        </Form>
      )}
    </Formik>
        </div>
  );
};

export default Login;
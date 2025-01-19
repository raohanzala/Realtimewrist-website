import React, { useState } from "react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";
import FormRowVerticle from "../components/FormRowVerticle";
import Input from "../components/Input";
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import { useSignIn } from "../api/useSignIn";
import { useSignUp } from "../api/useSignup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string(),
  email: Yup.string(),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters'),
});

const LoginCopy = () => {
  const [currentState, setCurrentState] = useState("Login");
const navigate = useNavigate()

  const {signIn, isLoading : isSigningIn} = useSignIn()
  const {signUp, isLoading : isSigningUp}= useSignUp()

  const {userData, token : token2, isLoggedIn} = useSelector((state)=> state.user)
  console.log(userData, token2, isLoggedIn, currentState)

  const onSubmitHandler = async (values) => {

    try {
      if (currentState === "Sign Up") {
        
        const {email, name, password} = values
        console.log(email, name, password, 'VALUES')

        signUp(values)
      } else {
        console.log('ELSE');
        const {email, password} = values
        signIn({email, password})
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);


  return (
     <Formik
          initialValues={{
            name: '',
            password: '',
            email: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log('Formik onSubmit called', values);
            onSubmitHandler(values);
          }}
        >
          {({ values, handleChange, isSubmitting, handleSubmit }) => (
            <Form
              onSubmit={handleSubmit}
              className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 text-gray-800"
            >
      <div className="inline-flex items-center gap-2 mb-5 mt-10">
        <p className="text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === "Login" ? (
        ""
      ) : (
        <FormRowVerticle name='name'>
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
      <FormRowVerticle name='email'>
      <Input
        type="email"
        name="email"
        size="large"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
        />
        </FormRowVerticle>

        <FormRowVerticle name='password'>

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
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create account{" "}
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Here{" "}
          </p>
        )}
      </div>
      <Button type='submit' >
        {(!isSubmitting || isSigningIn || isSigningUp) ? (currentState === "Login" ? "Sign In" : "Sign Up") : <Spinner/>}
      </Button>
    </Form>
          )}
    </Formik>
  );
};

export default LoginCopy;
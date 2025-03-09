import React, { lazy, Suspense, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import AppLayout from "./AppLayout";
import LoadingLogo from "./components/LoadingLogo";
import ErrorBoundary from "./components/ErrorBoundary";
import LoginCopy from "./pages/Login";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsAndConditions from "./components/TermsAndConditions";
import Spinner from "./components/Spinner";
import CategoryProducts from "./pages/CategoryProducts";
import GenderProducts from "./pages/GenderProducts";
import useScrollRestoration from "./hooks/useScrollRestoration";
import { io } from "socket.io-client";


const Home = lazy(() => import("./pages/Home"));
const Collection = lazy(() => import("./pages/Collection"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Product = lazy(() => import("./pages/Product"));
const Cart = lazy(() => import("./pages/Cart"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder"));
const Orders = lazy(() => import("./pages/Order"));
const NotFound = lazy(() => import("./components/NotFound"));

const backendUrl = import.meta.env.VITE_BACKEND_URL


const socket = io(backendUrl);

const App = () => {

  useScrollRestoration()

  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    socket.emit("userConnected"); // Notify the server when a user visits

    socket.on("heartbeat", () => {
      socket.emit("heartbeat_response"); // Send a response to confirm activity
    });

    return () => {
      socket.disconnect(); // Disconnect on unmount
    };
  }, []);

  return (
    <div>
      <div>
        <AppLayout>
          {
            isLoading ? <LoadingLogo /> :
              <Suspense fallback={<div className="h-screen flex items-center justify-center"> <Spinner variant='secondary' size={30} /></div>}>
                <ErrorBoundary>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/all-collection" element={<Collection />} />
                    <Route path="/category/:category/:categoryId" element={<CategoryProducts />} />
                    <Route path="/gender/:gender" element={<GenderProducts />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/product/:productId" element={<Product />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<LoginCopy />} />
                    <Route path="/place-order" element={<PlaceOrder />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route
                      path="/terms-and-condition"
                      element={<TermsAndConditions />}
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </ErrorBoundary>
              </Suspense>
          }
        </AppLayout>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "1px" }}
          toastOptions={{
            success: {
              duration: 2000,
            },
            error: {
              duration: 3000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
            },
          }}
        />
      </div>
    </div>
  );
};

export default App;

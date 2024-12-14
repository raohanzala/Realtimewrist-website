import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import { Toaster } from 'react-hot-toast'
import AppLayout from './AppLayout'
import LoadingLogo from './components/LoadingLogo'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingSpinner from './components/LoadingSpinner'

// Lazy loading components for better performance
const Home = lazy(() => import('./pages/Home'));
const Collection = lazy(() => import('./pages/Collection'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Product = lazy(() => import('./pages/Product'));
const Cart = lazy(() => import('./pages/Cart'));
const Login = lazy(() => import('./pages/Login'));
const PlaceOrder = lazy(() => import('./pages/PlaceOrder'));
const Orders = lazy(() => import('./pages/Order'));
const NotFound = lazy(() => import('./components/NotFound')); // Assume you have a NotFound component

const App = () => {

  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 700) 
    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <div>
      <div>
        {loading ?  <LoadingLogo/>  
       : ( <AppLayout>

          {/* <Suspense fallback={<LoadingLogo />}> */}
            <ErrorBoundary>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/collection' element={<Collection />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/contact' element={<Contact />} />
                  <Route path='/product/:productId' element={<Product />} />
                  <Route path='/cart' element={<Cart />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/place-order' element={<PlaceOrder />} />
                  <Route path='/orders' element={<Orders />} />
                  <Route path='*' element={<NotFound/>} />
                </Routes>
            </ErrorBoundary>
          </AppLayout>)
    
            }
      <Toaster
        position='top-center'
        gutter={12}
        containerStyle={{ margin: '1px' }}
        toastOptions={{
          success: {
            duration: 2000
          },
          error: {
            duration: 3000
          },
          style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: '16px 24px',

          }
        }}
      />
      </div>
    </div>
  )
}

export default App
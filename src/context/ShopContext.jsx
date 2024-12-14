import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext()


const ShopContextProvider = ({ children }) => {
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const currency = 'Rs.'
  const delivery_fee = 250
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [cartItems, setCartItems] = useState({})
  const [category, setCategory] = useState(['Automatic', 'Casual', 'Formal', 'Luxury' ,'Quartz'])
  const [token, setToken] = useState('')
  const navigate = useNavigate()

  // console.log(category)
  


  // Fetching all products from databse
  

  const getProductsData = async()=> {
    try {
        const response = await axios.get(backendUrl + '/api/product/list')

        if(response.data.success){
          setProducts(response.data.products)
          console.log(response);
          
        }else{
          toast.error(response.data.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  }

  useEffect(()=> {
    getProductsData()
  },[])

  console.log(cartItems, 'CartItems')


  const addToCart = async (itemId, size) => {
    toast.dismiss()
    toast.success('Added to cart')
    let cartData = structuredClone(cartItems);
  
    if (cartData[itemId]) {
      if(cartData[itemId][size]){
        cartData[itemId][size] += 1
      }else {
        cartData[itemId][size] = 1
      }
    } else {
      cartData[itemId]  = {};
      cartData[itemId][size] = 1; 
    }
  
    setCartItems(cartData);
    
    console.log(itemId, size , 'Item Id and Size')
    
    if (token) {
      try {
        const response = await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size }, 
          { headers: { token } }
        );
        console.log(response);
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  useEffect(()=> {
      console.log(cartItems)
  }, [cartItems])
  
  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, sizes) => {
      return total + Object.values(sizes).reduce((count, qty) => count + qty, 0);
    }, 0);
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems)

    if (cartData[itemId] && cartData[itemId][size]) {
      cartData[itemId][size] = quantity;
      setCartItems(cartData);

      if(token){
        try {
            await axios.post(backendUrl + '/api/cart/update', {itemId, size, quantity}, {headers : {token}})
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    } else {
      console.error(`Item ${itemId} with size ${size} does not exist in the cart`);
    }
  }


  const getUserCart = async ({token})=> {
    try {
        const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers: {token}})
        if(response.data.success){
          setCartItems(response.data.cartData)
        }
    } catch (error) {
      console.log(error)
          toast.error(error.message)
    }
  }


  const getCartAmount = () => {
    let totalAmount = 0
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items)
      if (!itemInfo) {
        console.error(`Product with id ${items} not found`);
        continue;
      }
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.newPrice * cartItems[items][item]
          }
        } catch (error) {
          console.error(`Error calculating cart amount for item ${item}`, error);
        }
      }
    }
    return totalAmount
  }

  useEffect(()=> {
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
      getUserCart(localStorage.getItem('token'))
    }
  },[])

  const value = { products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, cartItems, setCartItems, addToCart, getCartCount, updateQuantity, category, setCategory, getCartAmount, navigate, backendUrl, token, setToken }

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider


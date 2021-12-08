import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()


const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0
}
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const removeCartItem = (id) => {
    dispatch({ type: 'REMOVE_CART_ITEM', payload: id })
  }

  const increaseCartItem = (id) => {
    dispatch({ type: 'INCREASE_CART_ITEM', payload: id })
  }

  const decreaseCartItem = (id) => {
    dispatch({ type: 'DECREASE_CART_ITEM', payload: id })
  }

  useEffect(() => {
    dispatch({ type: 'GET_TOTAL' })
  }, [state.cart])

  const getData = async () => {
    dispatch({ type: 'LOADING' })
    const reponse = await fetch(url)
    const cart = await reponse.json()
    dispatch({ type: 'DISPLAY_ITEMS', payload: cart })
  }

  useEffect(() => {
    getData();
  }, [])
  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeCartItem,
        increaseCartItem,
        decreaseCartItem
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }

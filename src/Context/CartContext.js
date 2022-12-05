import React, { createContext, useReducer } from 'react'
import { CartReducer } from './CartReducer'

export const CartContext = createContext();

export const CartContextProvider = (props) => {

    let number=99;
    let word="First";
    const [cart, dispatch] = useReducer(CartReducer,{number,word})

    return (
        <CartContext.Provider value={{...cart, dispatch }}>
            {props.children}
        </CartContext.Provider>
    )
}
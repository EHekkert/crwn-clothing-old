import { createContext, useReducer } from 'react';

import { createAction } from '../utils/Reducer';

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
};

export const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
};

const addCartItem = (cartItems, productToAdd) => 
{
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    if (existingCartItem) {
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        );
    }
 
    return [...cartItems, { ...productToAdd, quantity: 1 }]
};

const removeCartItem = (cartItems, productToDeduct) => 
{
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToDeduct.id);
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToDeduct.id);
    }

    return cartItems.map((cartItem) => 
        cartItem.id === productToDeduct.id && cartItem.quantity > 0
        ? {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    );
};

const deleteCartItem = (cartItems, productToRemove) => 
{    
    return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);    
};

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    deleteItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

const cartReducer = ( state, { type, payload }) => {
    switch(type) {
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        default:
            throw new Error(`Unhandled type of ${type} in cartReducer`);
    }
};

export const CartProvider = ({ children }) => {
    const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch ] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                cartCount: newCartCount,
                cartTotal: newCartTotal
            })
        );
    };

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemFromCart = (productToDeduct) => {
        const newCartItems = removeCartItem(cartItems, productToDeduct);
        updateCartItemsReducer(newCartItems);
    };

    const deleteItemFromCart = (productToRemove) => {
        const newCartItems = deleteCartItem(cartItems, productToRemove);
        updateCartItemsReducer(newCartItems);
    };

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool ));
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        addItemToCart,
        removeItemFromCart,
        deleteItemFromCart,
        cartItems,
        cartCount,
        cartTotal };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};
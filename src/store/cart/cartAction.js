import { CART_ACTION_TYPES } from "./cartTypes";
import { createAction } from "../../utils/Reducer";

export const setIsCartOpen = (boolean) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

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

export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, productToDeduct) => {
    const newCartItems = removeCartItem(cartItems, productToDeduct);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const deleteItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = deleteCartItem(cartItems, productToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
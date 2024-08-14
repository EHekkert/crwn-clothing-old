import { createContext, useState, useEffect } from 'react';

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


export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        setCartTotal(newTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemFromCart = (productToDeduct) => {
        setCartItems(removeCartItem(cartItems, productToDeduct));
    };

    const deleteItemFromCart = (productToRemove) => {
        setCartItems(deleteCartItem(cartItems, productToRemove));
    };

    const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, deleteItemFromCart, cartItems, cartCount, cartTotal };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
};
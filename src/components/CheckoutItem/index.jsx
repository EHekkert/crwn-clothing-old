import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import './index.scss';

const CheckoutItem = ({checkoutItem}) => {
    const { addItemToCart, removeItemFromCart, deleteItemFromCart } = useContext(CartContext);
    const { name, price, imageUrl, quantity } = checkoutItem;

    const addProductToCart = () => addItemToCart(checkoutItem);
    const removeProductFromCart = () => removeItemFromCart(checkoutItem);
    const deleteProductFromCart = () => deleteItemFromCart(checkoutItem);

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>            
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeProductFromCart}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addProductToCart}>
                    &#10095;
                </div>
            </span>
            <span className='price'>€{price}</span>
            <div className='remove-button' onClick={deleteProductFromCart}>&#10005;</div>
        </div>
    )
};

export default CheckoutItem;
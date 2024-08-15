import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import { CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, Value, RemoveButton } from './styles.jsx';

const CheckoutItem = ({checkoutItem}) => {
    const { addItemToCart, removeItemFromCart, deleteItemFromCart } = useContext(CartContext);
    const { name, price, imageUrl, quantity } = checkoutItem;

    const addProductToCart = () => addItemToCart(checkoutItem);
    const removeProductFromCart = () => removeItemFromCart(checkoutItem);
    const deleteProductFromCart = () => deleteItemFromCart(checkoutItem);

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>            
            <BaseSpan>{name}</BaseSpan>
            <Quantity className='quantity'>
                <Arrow onClick={removeProductFromCart}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addProductToCart}>&#10095;</Arrow>
            </Quantity>
            <BaseSpan>€{price}</BaseSpan>
            <RemoveButton onClick={deleteProductFromCart}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    )
};

export default CheckoutItem;
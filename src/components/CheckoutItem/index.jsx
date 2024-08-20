import { useSelector, useDispatch } from 'react-redux';

import { CheckoutItemContainer, ImageContainer, BaseSpan, Quantity, Arrow, Value, RemoveButton } from './styles.jsx';
import { selectCartItems} from '../../store/cart/cartSelector';
import { addItemToCart, deleteItemFromCart, removeItemFromCart } from '../../store/cart/cartAction.js';

const CheckoutItem = ({checkoutItem}) => {
    const { name, price, imageUrl, quantity } = checkoutItem;
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const addProductToCart = () => dispatch(addItemToCart(cartItems, checkoutItem));
    const removeProductFromCart = () => dispatch(removeItemFromCart(cartItems, cartItems, checkoutItem));
    const deleteProductFromCart = () => dispatch(deleteItemFromCart(checkoutItem));

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
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectCartItems, selectIsCartOpen } from '../../store/cart/cartSelector';
import { setIsCartOpen } from '../../store/cart/cartAction';

import Button from '../Button';
import CartItem from '../CartItem';

import { CartDropdownContainer, EmptyMessage, CartItems } from './styles';

const CardDropdown = () => {
    const dispatch = useDispatch();
    
    const cartItems = useSelector(selectCartItems);
    const isCartOpen = useSelector(selectIsCartOpen);

    const navigate = useNavigate();

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    const goToCheckoutHandler = () => {
        toggleIsCartOpen();
        navigate('/Checkout');
    };

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
                ) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )}
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
};

export default CardDropdown;
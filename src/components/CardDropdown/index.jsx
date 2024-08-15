import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';

import Button from '../Button';
import CartItem from '../CartItem';

import { CartDropdownContainer, EmptyMessage, CartItems } from './styles';

const CardDropdown = () => {
    const { cartItems, isCartOpen, setIsCartOpen } = useContext(CartContext);
    const navigate = useNavigate();

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

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
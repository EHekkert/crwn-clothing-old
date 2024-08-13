import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';

import Button from '../Button';
import CartItem from '../CartItem';

import './index.scss';

const CardDropdown = () => {
    const { cartItems, isCartOpen, setIsCartOpen } = useContext(CartContext);
    const navigate = useNavigate();

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    const goToCheckoutHandler = () => {
        toggleIsCartOpen();
        navigate('/Checkout');
    };

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
            </div>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </div>
    )
};

export default CardDropdown;
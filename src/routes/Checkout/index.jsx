import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/CheckoutItem';

import { CheckoutContainer, Header, HeaderBlock, Total } from './styles.jsx';

const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext);

    return (
        <CheckoutContainer>
            <Header>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </Header>
            {cartItems.map((item) => (
                <CheckoutItem key={item.id} checkoutItem={item} />
            ))}
            <Total>Total: €{cartTotal}</Total>
        </CheckoutContainer>
    )
};

export default Checkout;
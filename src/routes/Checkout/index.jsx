import { useSelector } from 'react-redux';

import { selectCartItems, selectCartTotal } from '../../store/cart/cartSelector';

import CheckoutItem from '../../components/CheckoutItem';
import PaymentForm from '../../components/PaymentForm';

import { CheckoutContainer, Header, HeaderBlock, Total } from './styles';

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);  
    const cartTotal = useSelector(selectCartTotal);   

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
            <PaymentForm />
        </CheckoutContainer>
    )
};

export default Checkout;
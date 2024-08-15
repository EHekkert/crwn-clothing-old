import { CartItemContainer, ItemDetails } from './styles';

const CartItem = ({cartItem: { name, price, imageUrl, quantity } }) => {
    return (
        <CartItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ItemDetails>
                <span>{name}</span>
                <span>{quantity} x €{price}</span>
            </ItemDetails>
        </CartItemContainer>
    )
};

export default CartItem;
import { useDispatch, useSelector } from 'react-redux';

import { selectCartCount, selectIsCartOpen} from '../../store/cart/cartSelector';
import { setIsCartOpen } from '../../store/cart/cartAction';

import { CartIconContainer, ShoppingIcon, ItemCount } from './styles.jsx';

const CartIcon = () => {
    const dispatch = useDispatch();

    const cartCount = useSelector(selectCartCount);
    const isCartOpen = useSelector(selectIsCartOpen);

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;
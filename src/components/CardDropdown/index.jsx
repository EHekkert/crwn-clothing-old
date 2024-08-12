import Button from '../Button';

import './index.scss';

const CardDropdown = () => {
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items' />
            <Button>GO TO CHECKOUT</Button>
        </div>
    )
};

export default CardDropdown;
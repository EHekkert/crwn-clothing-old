import { Fragment, useContext } from 'react';
import { Outlet,  Link } from 'react-router-dom';

import CartIcon from '../../components/CartIcon';
import CardDropdown from '../../components/CardDropdown';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/Firebase';

import './index.scss';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
    
    return (
      <Fragment>
        <div className='navigation'>
            <Link className='logo-container' to='/'>
                <CrwnLogo className='logo' />
            </Link>
            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'>
                    SHOP
                </Link>
                <Link className='nav-link' to='/'>
                    CONTACT
                </Link>
                { currentUser ? (
                        <span className='nav-link' onClick={signOutUser}>
                            SIGN OUT
                        </span>
                    ) : (
                        <Link className='nav-link' to='/auth'>
                            SIGN IN
                        </Link>
                    )
                } 
                <CartIcon />              
            </div>
            {isCartOpen && <CardDropdown />}
        </div>
        <Outlet />
      </Fragment>
    );
  };

  export default Navigation;
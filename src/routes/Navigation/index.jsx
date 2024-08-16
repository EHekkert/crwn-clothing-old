import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import CartIcon from '../../components/CartIcon';
import CardDropdown from '../../components/CardDropdown';

import { CartContext } from '../../contexts/cart.context';
import { selectCurrentUser } from '../../store/user/userSelector';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/Firebase';

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './style';

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const { isCartOpen } = useContext(CartContext);
    
    return (
      <Fragment>
        <NavigationContainer>
            <LogoContainer to='/'>
                <CrwnLogo className='logo' />
            </LogoContainer>
            <NavLinks>
                <NavLink to='/shop'>
                    SHOP
                </NavLink>
                <NavLink to='/'>
                    CONTACT
                </NavLink>
                { currentUser ? (
                        <NavLink as='span' onClick={signOutUser}>
                            SIGN OUT
                        </NavLink>
                    ) : (
                        <NavLink to='/auth'>
                            SIGN IN
                        </NavLink>
                    )
                } 
                <CartIcon />              
            </NavLinks>
            {isCartOpen && <CardDropdown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    );
  };

  export default Navigation;
import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CartIcon from '../../components/CartIcon';
import CardDropdown from '../../components/CardDropdown';

import { selectIsCartOpen } from '../../store/cart/cartSelector';
import { selectCurrentUser } from '../../store/user/userSelector';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutStart } from '../../store/user/userAction';

import { NavigationContainer, LogoContainer, NavLinks, NavLink } from './style';

const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
    
    const signOutUser = () => dispatch(signOutStart());
    
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
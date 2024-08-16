import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Home from '../../routes/Home';
import Navigation from '../../routes/Navigation';
import SignIn from '../../routes/Authentication';
import Shop from '../../routes/Shop';
import Checkout from '../../routes/Checkout';
import { setCurrentUser } from '../../store/user/userAction';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../../utils/Firebase';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
        if (user) {
            createUserDocumentFromAuth(user);
        }
        dispatch(setCurrentUser(user));
    });

    return unsubscribe;
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<SignIn />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  )
}

export default App;
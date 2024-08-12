import { Routes, Route } from 'react-router-dom';

import Navigation from '../../routes/Navigation';
import Home from '../../routes/Home';
import SignIn from '../../routes/Authentication';
import Shop from '../../routes/Shop';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='auth' element={<SignIn />} />
      </Route>
    </Routes>
  )
}

export default App;
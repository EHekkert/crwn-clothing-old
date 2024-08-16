import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { getCategoriesAndDocuments } from '../../utils/Firebase/index.js';

import CategoriesPreview from '../CategoriesPreview';
import Category from '../Category';
import { setCategoriesMap } from '../../store/categories/categoryAction'

const Shop = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      const getCategoriesMap = async () => {
          const categoryMap = await getCategoriesAndDocuments();
          dispatch(setCategoriesMap(categoryMap));
      }
      getCategoriesMap();
    }, []);

    return ( 
        <Routes>
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );
};

export default Shop;
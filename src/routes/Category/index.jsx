import { useState, useEffect , Fragment} from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/ProductCard';

import { selectCategoriesMap } from '../../store/categories/categorySelector';

import { CategoryContainer, Title } from './styles';

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <Title>{category.toUpperCase()}</Title>
            <CategoryContainer>
                {products &&
                    products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    )               )}
            </CategoryContainer>
        </Fragment>
    );
};

export default Category;
import { useState, useEffect , Fragment} from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/ProductCard';
import Spinner from '../../components/Spinner'

import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/categorySelector';

import { CategoryContainer, Title } from './styles';

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <Title>{category.toUpperCase()}</Title>
            {isLoading ? (
                <Spinner />
            ) : (
                <CategoryContainer>
                {products &&
                    products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    )               )}
                </CategoryContainer>
            )}          
        </Fragment>
    );
};

export default Category;
import { Fragment } from "react";
import { useSelector } from "react-redux";

import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/categorySelector';

import CategoryPreview from '../../components/CategoryPreview';
import Spinner from '../../components/Spinner';

const CategoriesPreview = () => {
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    return ( 
        <Fragment>
            {isLoading ? (
                <Spinner />
            ) : (
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                    return <CategoryPreview key={title} title={title} products={products} />
                })
            )}   
        </Fragment>
    );
};

export default CategoriesPreview;
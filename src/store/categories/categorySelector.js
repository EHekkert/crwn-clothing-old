import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => {
    return state.categories;
};

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => {
        return categoriesSlice.isLoading;
    }
)

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => {
        return categoriesSlice.categories;
    }
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => {
        return categories.reduce(
            (acc, { title, items }) => {
                acc[title.toLowerCase()] = items;
                return acc;
            }, {}
        )
    }
);
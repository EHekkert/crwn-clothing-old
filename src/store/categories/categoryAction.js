import { CATEGORIES_ACTION_TYPES } from './categoryTypes';
import { createAction } from '../../utils/Reducer';

export const setCategoriesMap = (categoriesMap) =>
    createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categoriesMap);
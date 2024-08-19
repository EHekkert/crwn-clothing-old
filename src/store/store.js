import { compose, createStore, applyMiddleware } from 'redux';
import { persist, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//import logger from 'redux-logger';

import { rootReducer } from './rootReducer';
import persistStore from 'redux-persist/es/persistStore';

const loggerMiddleware = (store) => (next) => (action) => {
    if (!action.type) {
        return next(action);
    }

    console.log('type', action.type);
    console.log('payload', action.payload);
    console.log('current state', store.getState());

    next(action);

    console.log('next state', store.getState());
};

const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleWares = [loggerMiddleware];

// const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
//     Boolean
// );

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
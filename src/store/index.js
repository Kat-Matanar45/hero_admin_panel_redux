import { configureStore } from '@reduxjs/toolkit';

import {reducer as reducerHer} from '../reducers/heroesSlice';
import {reducer as reducerFil} from '../reducers/filtersSlice';

const store = configureStore({
    reducer: {
        heroes: reducerHer, 
        filters: reducerFil
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
}) 

export default store;
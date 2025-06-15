import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: [],
    activFilter: 'all'
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
    filtersFetched: (state, action) => {state.filters = action.payload},
    filterFetched: (state, action) => {
        state.activFilter = action.payload;
        state.heroesLoadingStatus = 'idle';
    }
    }
})

export const {actions, reducer} = filtersSlice;

export const {
    filtersFetched,
    filterFetched
} = actions;
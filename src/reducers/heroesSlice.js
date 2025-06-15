import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    activID: ''
};

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetching: state => {
            state.heroesLoadingStatus = 'loading';
        },
        heroesFetched: (state, action) => {
            state.heroes = action.payload;
            state.heroesLoadingStatus = 'idle';
        },
        heroesFetchingError: state => {
            state.heroesLoadingStatus = 'error';
        },
        setActiveHero: (state, action) => {
            state.activID = action.payload;
            state.heroesLoadingStatus = 'idle';
        }
    }
});

export const {actions, reducer} = heroesSlice;

export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    setActiveHero
} = actions;
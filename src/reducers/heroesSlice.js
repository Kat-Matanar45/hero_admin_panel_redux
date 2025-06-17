import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    activID: ''
};

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/heroes")
    }
)

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
        setActiveHero: (state, action) => {
            state.activID = action.payload;
            state.heroesLoadingStatus = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                        state.heroes = action.payload;
                        state.heroesLoadingStatus = 'idle';
                    })
            .addCase(fetchHeroes.rejected, state => {state.heroesLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
});

export const {actions, reducer} = heroesSlice;

export const {
    heroesFetching,
    heroesFetched,
    setActiveHero
} = actions;
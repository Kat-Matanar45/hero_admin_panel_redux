import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activFilter: 'all'
};

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/filters")
    }
)

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filterFetched: (state, action) => {
            state.activFilter = action.payload;
            state.filtersLoadingStatus = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filters = action.payload;
                state.filtersLoadingStatus = 'idle'
            })
            .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
    }
})

export const {actions, reducer} = filtersSlice;

export const {
    filtersFetched,
    filterFetched
} = actions;
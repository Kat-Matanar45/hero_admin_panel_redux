const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    activID: '',
    activFilter: 'all'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'SET_ACTIVE_ID':
            return {
                ...state,
                activID: action.payload,
                heroesLoadingStatus: 'idle'
            };
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload,
            };
        case 'SET_ACTIVE_FILTER':
            return {
                ...state,
                activFilter: action.payload,
                heroesLoadingStatus: 'idle'
            };
        default: return state
    }
}

export default reducer;
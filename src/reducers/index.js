const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    activID: 0
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
        default: return state
    }
}

export default reducer;
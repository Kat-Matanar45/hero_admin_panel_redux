export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const setActiveHero = (id) => {
    return {
        type: 'SET_ACTIVE_ID',
        payload: id
    }
};

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
};

export const filterFetched = (filter) => {
    return {
        type: 'SET_ACTIVE_FILTER',
        payload: filter
    }
};


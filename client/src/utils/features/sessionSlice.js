// * depends 
import { createSlice } from "@reduxjs/toolkit";

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        sessionID: '',
        timestamp: '',
        name: '',
        email: '',
        status: false,
        favorites: [],
        filteredSearch: false,
        filteredSearchIDs: []
    },
    reducers: {
        makeSessionID: (state, sessionID) => {
            state.sessionID = sessionID
        },
        makeTimestamp: (state, timestamp) => {
            state.timestamp = timestamp
        },
        makeName: (state, name) => {
            state.name = name
        },
        makeEmail: (state, email) => {
            state.email = email
        },
        makeStatus: (state, status) => {
            state.status = status
        },
        makeFavorites: (state,favorite) => {
            state.favorites.push(favorite)
            // ! bc i am adding items here in a non-mutable way
            // ! there will be a 'dummy' in the 0 index of the session slice.
        },
        makeRemoveFavorite: (state, favorite) => {
            state.favorites.pop(favorite)
        },
        makeFilteredSearch: (state,filteredSearch) => {
            state.filteredSearch = filteredSearch
        },
        makeFilteredSearchIDs: (state, filteredSearchIDs) => {
            state.filteredSearchIDs = filteredSearchIDs
        }

    }
})

export const {makeSessionID} = sessionSlice.actions
export const {makeFavorites} = sessionSlice.actions
export const {makeRemoveFavorite} = sessionSlice.actions
export const {makeTimestamp} = sessionSlice.actions
export const {makeName} = sessionSlice.actions
export const {makeEmail} = sessionSlice.actions
export const {makeStatus} = sessionSlice.actions
export const {makeFilteredSearch} = sessionSlice.actions
export const {makeFilteredSearchIDs} = sessionSlice.actions
export default sessionSlice.reducer;
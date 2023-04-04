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
        accountDetails: {},
        location: {},
        expired: false
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
        makeAccountDetails: (state,accountDetails) => {
            state.accountDetails = accountDetails
        },
        makeExpired: (state,expired) => {
            state.expired = expired
        },
        makeLocation: (state,location) => {
            state.location = location
        }

    }
})

export const {makeSessionID} = sessionSlice.actions
export const {makeAccountDetails} = sessionSlice.actions
export const {makeTimestamp} = sessionSlice.actions
export const {makeName} = sessionSlice.actions
export const {makeEmail} = sessionSlice.actions
export const {makeStatus} = sessionSlice.actions
export const {makeExpired} = sessionSlice.actions
export const {makeLocation} = sessionSlice.actions
export default sessionSlice.reducer;
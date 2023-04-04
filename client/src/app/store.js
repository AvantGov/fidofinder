import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from '../utils/features/sessionSlice.js'

export default configureStore({
        reducer: {
            session: sessionReducer
        }
});
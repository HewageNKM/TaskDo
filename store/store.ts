import {configureStore} from "@reduxjs/toolkit";
import tasksSlice from "./tasksSlice/TaskSlice";


export const store = configureStore({
    reducer: {
        tasksSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


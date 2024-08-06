import {configureStore} from "@reduxjs/toolkit";
import tasksSlice from "./tasksSlice/TaskSlice";
import notificationSlice from "@/store/notificationSlice/notificationSlice";


export const store = configureStore({
    reducer: {
        tasksSlice,
        notificationSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


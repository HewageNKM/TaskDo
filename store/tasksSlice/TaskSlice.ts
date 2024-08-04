import {createSlice} from "@reduxjs/toolkit";

interface TaskSlice{
    tasks: Task[];
    error: any;
}
const tasksSlice = createSlice({
    name: 'tasksSlice',
    initialState: {},
    reducers: {}
});

export default tasksSlice.reducer;
export const {} = tasksSlice.actions;
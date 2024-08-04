import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {SQLiteDatabase} from "expo-sqlite";

interface TaskSlice {
    tasks: Task[];
    error: any;
    isFetchingTasks: boolean;
}

const initialState: TaskSlice = {
    tasks: [],
    error: null,
    isFetchingTasks: true
}
const tasksSlice = createSlice({
    name: 'tasksSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllTasks.fulfilled, (state, action) => {
            state.tasks = action.payload;
            state.error = null;
            state.isFetchingTasks = false;
        }).addCase(getAllTasks.rejected, (state, action) => {
            state.error = action.payload;
            state.isFetchingTasks = false;
        }).addCase(addTask.fulfilled, (state, action) => {
            state.error = null;
        }).addCase(addTask.rejected, (state, action) => {
            state.error = action.payload;
        });
    }
});
export const getAllTasks = createAsyncThunk('tasksSlice/fetchTasks', async ({db}: { db: SQLiteDatabase}, thunkAPI) => {
    try {
        const tasks: Task[] = await db.getAllAsync(`SELECT * FROM tasks`);
        console.log(tasks);
        return tasks;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const addTask = createAsyncThunk('tasksSlice/addTask', async ({task,db}:{task:Task,db:SQLiteDatabase}, thunkAPI) => {
    try {
        await db.runAsync('INSERT INTO tasks (title,description,status,reminder,createdAt) VALUES (?,?,?,?,?)', [task.title, task.description, task.status, task.reminder, task.createdAt]);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const initializeTables = createAsyncThunk('tasksSlice/createTables', async ({db}: {
    db: SQLiteDatabase
}, thunkAPI) => {
    try {
        await db.runAsync(`CREATE TABLE IF NOT EXISTS tasks( id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT NOT NULL, status TEXT, reminder INTEGER, createdAt INTEGER NOT NULL)`);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});
export default tasksSlice.reducer;
export const {} = tasksSlice.actions;
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
        }).addCase(getTasksByStatus.fulfilled, (state, action) => {
            state.tasks = action.payload;
            state.error = null;
            state.isFetchingTasks = false;
        }).addCase(getTasksByStatus.rejected, (state, action) => {
            state.error = action.payload;
            state.isFetchingTasks = false;
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

export const getTasksByStatus = createAsyncThunk('tasksSlice/getTasksByStatus', async ({db,status}: { status:string,db: SQLiteDatabase}, thunkAPI) => {
    try {
        switch (status){
            case 'all':
                return await db.getAllAsync(`SELECT * FROM tasks`);
            case 'cp':
                return await db.getAllAsync(`SELECT * FROM tasks WHERE status='Complete'`);
            case 'ip':
                return await db.getAllAsync(`SELECT * FROM tasks WHERE status='Incomplete'`);
        }
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

export const updateTaskStatusById = createAsyncThunk('tasksSlice/updateTaskStatusById', async ({id,status,db}:{status:string,id:number,db:SQLiteDatabase}, thunkAPI) => {
    try {
        await db.runAsync('UPDATE tasks SET status=? WHERE id=?', [status,id]);
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteTask = createAsyncThunk('tasksSlice/deleteTask', async ({id,db}:{id:number,db:SQLiteDatabase}, thunkAPI) => {
    try {
        await db.runAsync('DELETE FROM tasks WHERE id=?', [id]);
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
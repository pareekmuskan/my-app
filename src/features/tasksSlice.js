import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: [],
    filter: 'all',
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action) {
            state.tasks.push(action.payload);
        },
        editTask(state, action) {
            const { id, updates } = action.payload;
            const task = state.tasks.find(task => task.id === id);
            if (task) {
                Object.assign(task, updates);
            }
        },
        deleteTask(state, action) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        toggleComplete(state, action) {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) {
                task.completed = !task.completed;
            }
        },
        setFilter(state, action) {
            state.filter = action.payload;
        },
    },
});

export const { addTask, editTask, deleteTask, toggleComplete, setFilter } = tasksSlice.actions;
export default tasksSlice.reducer;

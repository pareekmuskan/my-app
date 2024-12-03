import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, deleteTask, toggleComplete, setFilter } from '../features/tasksSlice';

const Dashboard = () => {
    const tasks = useSelector((state) => state.tasks.tasks);
    const filter = useSelector((state) => state.tasks.filter);
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleAddTask = (e) => {
        e.preventDefault();
        if (title.trim() === '' || dueDate === '') {
            alert('Please provide a title and due date.');
            return;
        }

        const newTask = {
            id: Date.now(), // Unique ID for the task
            title,
            description,
            dueDate,
            completed: false,
        };

        dispatch(addTask(newTask)); // Dispatch action to add task
        setTitle(''); // Reset form fields
        setDescription('');
        setDueDate('');
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        if (filter === 'overdue') return new Date(task.dueDate) < new Date() && !task.completed;
        return true;
    });

    return (
        <div class="design">
            <h1>Task Dashboard</h1>

            {/* Add Task Form */}
            <form onSubmit={handleAddTask} className='formDesign'>
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                <button type="submit">Add Task</button>
            </form>

            {/* Task Filters */}
            <div className='btnSelect'>
                <button onClick={() => dispatch(setFilter('all'))}>All Tasks</button>
                <button onClick={() => dispatch(setFilter('completed'))}>Completed Tasks</button>
                <button onClick={() => dispatch(setFilter('pending'))}>Pending Tasks</button>
                <button onClick={() => dispatch(setFilter('overdue'))}>Overdue Tasks</button>
            </div>

            {/* Task List */}
            <ul>
                {filteredTasks.map(task => (
                    <li key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>Due: {task.dueDate}</p>
                        <button onClick={() => dispatch(toggleComplete(task.id))}>
                            {task.completed ? 'Undo' : 'Complete'}
                        </button>
                        <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;

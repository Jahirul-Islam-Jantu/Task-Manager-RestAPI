import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/TaskManager', {
    autoIndex:true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Task Schema and Model
const TaskSchema = new mongoose.Schema({
    text: String,
    title: String,
    description: String,
    date: Date,
    isDone: Boolean,
}, { versionKey: false, timestamps: true });


const Task = mongoose.model('Task', TaskSchema);

// API Routes
// API Routes
app.get('/getTodos', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/setTodos', async (req, res) => {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json(newTask);
});

app.put('/updateTodos/:id', async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
});

app.delete('/deleteTodos/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
});


// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

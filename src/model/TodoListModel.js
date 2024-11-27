import mongoose from 'mongoose';
const TodoListModel = mongoose.Schema({
    Username: {type: String},
    TodoSubject: {type: String, required: true},
    TodoDescription: {type: String, required: true},
    TodoStatus: {type: String, default: "New"},
    TodoDate: {type: Date, default: Date.now},
}, {versionKey: false, timestamps: true});

const TodoModel = mongoose.model('Todo', TodoListModel);
export default TodoModel;
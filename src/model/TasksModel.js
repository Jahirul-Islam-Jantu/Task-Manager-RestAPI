import mongoose from 'mongoose'

const dataSchema = mongoose.Schema  ({
    email: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, required: true},
}, {versionKey: false, timestamps: true});

const TaskModel = mongoose.model('tasks', dataSchema);

export default TaskModel;
import mongoose from 'mongoose'

const dataSchema = mongoose.Schema = ({
    title: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String, required: true},
}, {versionKey: false, timestamps: true});

const Tasks = mongoose.model('tasks', dataSchema);

export default Tasks;
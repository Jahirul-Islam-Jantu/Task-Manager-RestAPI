import mongoose from 'mongoose'

const dataSchema = mongoose.Schema  ({
    email: {type: String, unique: true, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    mobile: {type: String, required: true},
    password: {type: String, required: true},
}, {versionKey: false, timestamps: true});

const UserModel = mongoose.model('users', dataSchema);

export default UserModel;
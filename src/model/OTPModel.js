import mongoose from 'mongoose'

const dataSchema = mongoose.Schema  ({
    email: {type: String, required: true},
    otp: {type: String, required: true},
    status: {type: String, required: true},
}, {versionKey: false, timestamps: true});

const OTPModel = mongoose.model('otps', dataSchema);

export default OTPModel;
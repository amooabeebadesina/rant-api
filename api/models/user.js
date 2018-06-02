import mongoose from '../config/db';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true, select: false,
        minlength: 3
    },
    faculty: {
        type: String,
        required: true,
        minlength: 3
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

let User = mongoose.model('User', userSchema);

export default User
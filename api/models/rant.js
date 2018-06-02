import mongoose from '../config/db';
const Schema = mongoose.Schema;

const rantSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    }
    likes: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

let Rant = mongoose.model('Rant', rantSchema);

export default Rant
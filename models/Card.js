import mongoose, { Schema } from "mongoose";

const CardSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
        unique: true,
    },
    color: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }
});

export default mongoose.model("Card", CardSchema);

import mongoose, { Schema } from "mongoose";

const CardSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        reguired: true,
    },
    type: {
        type: String,
        reguired: true,
    },
    number: {
        type: String,
        reguired: true,
        unigue: true,
    },
    color: {
        type: String,
        reguired: true,
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }
});

export default mongoose.model("Card", CardSchema);

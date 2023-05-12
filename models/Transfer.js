import mongoose, { Schema } from "mongoose";

const TransferSchema = new mongoose.Schema({
  id_sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  id_receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sum_transfer: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Transfer", TransferSchema);

import mongoose, { Schema } from "mongoose";

const TransferSchema = new mongoose.Schema({
  id_sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    reguired: true,
  },
  id_receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    reguired: true,
  },
  sum_transfer: {
    type: Number,
    reguired: true,
  },
});

export default mongoose.model("Transfer", TransferSchema);

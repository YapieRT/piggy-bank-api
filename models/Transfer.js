import mongoose from "mongoose";

const TransfersSchema = new mongoose.Schema({
  id_transfer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  id_sender: {
    type: String,
    reguired: true,
  },
  id_receiver: {
    type: String,
    reguired: true,
  },
  sum_transfer: {
    type: String,
    reguired: true,
  },
});

export default mongoose.model("Transfers", TransfersSchema);
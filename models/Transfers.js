import mongoose from "mongoose";

const TransfersSchema = new mongoose.Schema({
  id_transfer: {
    type: Number,
    reguired: true,
  },
  id_sender: {
    type: Number,
    reguired: true,
  },
  id_receiver: {
    type: Number,
    reguired: true,
  },
  sum_transfer: {
    type: String,
    reguired: true,
  },
});

export default mongoose.model("Transfers", TransfersSchema);

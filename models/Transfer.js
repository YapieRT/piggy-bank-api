import mongoose from 'mongoose';

const TransferSchema = new mongoose.Schema({
  SenderCard: {
    type: Number,
    required: true,
  },
  ReceiverCard: {
    type: Number,
    required: true,
  },
  sum_transfer: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('Transfer', TransferSchema);

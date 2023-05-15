import Transfer from '../models/Transfer.js';
import User from '../models/User.js';
import Card from '../models/Card.js';

export const createTransfer = async (req, res) => {
  try {
    const { SenderCard, ReceiverCard, sum_transfer } = req.body;

    if (!SenderCard || !ReceiverCard || !sum_transfer) {
      return res.status(400).json({
        message: 'Failed to create transfer. Check that all required fields are filled.',
      });
    }

    const IsCardSender = await Card.exists({ number: SenderCard });
    if (!IsCardSender) return res.status(400).json({ message: 'Sender card does not exist.' });

    const IsCardReceiver = await Card.exists({ number: ReceiverCard });
    if (!IsCardReceiver) return res.status(400).json({ message: 'Receiver card does not exist.' });

    let cardSender = await Card.findOne({ number: SenderCard });
    let balanceSender = cardSender.get('balance');
    //console.log(`Sender balance: ${balanceSender}`);

    let cardReceiver = await Card.findOne({ number: ReceiverCard });
    let balanceReceiver = cardReceiver.get('balance');
    //console.log(`Receiver balance: ${balanceReceiver}`);

    if (balanceSender >= sum_transfer) {
      await cardSender.updateOne({ balance: balanceSender - sum_transfer });
      await cardReceiver.updateOne({ balance: balanceReceiver + sum_transfer });
    }

    const transfer = new Transfer(req.body);
    await transfer.save();
    res.status(201).json({ message: 'The transfer was created successfully.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Transfer error.' });
  }
};

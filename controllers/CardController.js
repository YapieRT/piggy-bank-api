import Card from '../models/Card.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

export const createCard = async (req, res) => {
  try {
    const userId = req.body.userId;

    const type = req.body.cardType;
    const color = req.body.cardColor;

    const IsUser = await User.findOne({ _id: userId });

    if (!IsUser) return res.status(400).json({ message: 'This user does not exist.' });

    const HasCard = await Card.find({ userId }).count();
    if (HasCard) return res.status(400).json({ message: 'This user already has a card.' });

    const count = await Card.countDocuments({ type: type });

    const firstNumber = type === 'visa' ? 4 : 5;
    let len = 15 - String(count + 1).length;
    const number = firstNumber + '0'.padStart(len, '0') + (count + 1);

    const doc = new Card({
      userId,
      type,
      number,
      color,
    });

    const card = await doc.save();

    return res.json({
      message: 'success',
      data: card._doc,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to create card.',
    });
  }
};

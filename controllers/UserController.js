import { validationResult } from 'express-validator';
import User from '../models/User.js';
import Transfer from '../models/Transfer.js';
import Card from '../models/Card.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const existenceCheck = async (req, res) => {
  try {
    console.log(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const email = req.body.email;
    const phone_number = req.body.phone_number;

    const EmailInUse = await User.findOne({ email });

    if (EmailInUse) return res.status(400).json({ message: 'This email address is already in use.' });

    const PhoneNumberInUse = await User.findOne({ phone_number });
    if (PhoneNumberInUse) return res.status(400).json({ message: 'This phone number is already in use.' });
    res.json({
      message: 'Все корректно',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to verify data.',
    });
  }
};

export const register = async (req, res) => {
  console.log(req.body);
  try {
    const email = req.body.email;
    const name = req.body.name;
    const surname = req.body.surname;
    const birth_date = req.body.birth_date;
    const phone_number = req.body.phone_number;
    const address = req.body.address;

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const doc = new User({
      name,
      surname,
      birth_date,
      phone_number,
      address,
      email,
      passwordHash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      'secret123',
      {
        expiresIn: '30d',
      }
    );

    res.json({
      ...user._doc,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to register.',
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: 'User with this email address was not found.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password entered.' });
    }

    const token = jwt.sign({ _id: user._id }, 'secret123', {
      expiresIn: '30d',
    });

    res.json({
      //...user._doc,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'An error occurred during authorization.',
    });
  }
};

export const getTransfersById = async (req, res) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res.status(400).json({ message: 'Token is missing' });
    }

    const decoded = jwt.verify(token, 'secret123');

    const userId = decoded._id;

    const user = await User.findById(userId);

    const card = await Card.findOne({ userId: userId });

    const transfers = await Transfer.find({ $or: [{ id_sender: userId }, { id_receiver: userId }] }).populate(
      'id_sender id_receiver',
      'name surname'
    );
    res.json({
      user: user,
      card: card,
      transfers: transfers,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

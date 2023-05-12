import { validationResult } from "express-validator";
import User from "../models/User.js";
import Transfer from "../models/Transfer.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json(errors.array());

    const email = req.body.email;
    const InUse = await User.findOne({ email });
    if (InUse)
      return res
        .status(400)
        .json({ message: "Дана електронна пошта вже використовується" });

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
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    res.json({
      ...user._doc,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалося зареєструватися",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Користувач з такою електронною адресою не знайдений",
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Введено неправильний пароль" });
    }

    const token = jwt.sign({ _id: user._id }, "secret123", {
      expiresIn: "30d",
    });

    res.json({
      //...user._doc,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Помилка під час авторизації",
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
    const transfers = await Transfer.find({ $or : [{id_sender: userId}, {id_receiver: userId}] }).populate('id_sender id_receiver', "name surname");
    res.json({
      "user": user,
      "transfers": transfers
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

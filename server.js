import express from "express";
import * as UserController from "./controllers/UserController.js";
import * as connectDB from "./db.js"

connectDB.connectDB();

const app = express();

app.use(express.json());

app.post('/signup', UserController.register);


const PORT = process.env.PORT || 3002;

app.listen(PORT, (err) => {
  console.log(`Server started on port ${PORT}`)
    if (err) {
      return console.log(err);
    }
  });
  
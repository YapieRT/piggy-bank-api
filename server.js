import express from "express";
import * as connectDB from "./db.js";
import * as UserController from "./controllers/UserController.js";
import * as CardController from "./controllers/CardController.js";

connectDB.connectDB();

const app = express();

app.use(express.json());

app.post("/signup", UserController.register);
app.post("/create-card", CardController.createCard);
app.post("/login", UserController.login);

const PORT = process.env.PORT || 3002;

app.listen(PORT, (err) => {
  console.log(`Server started on port ${PORT}`);
  if (err) {
    return console.log(err);
  }
});

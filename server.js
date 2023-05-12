import express from "express";
import * as connectDB from "./db.js";
import * as UserController from "./controllers/UserController.js";
import * as CardController from "./controllers/CardController.js";
import * as TransfersController from "./controllers/TransfersController.js";
import * as AdminController from "./controllers/AdminController.js";

connectDB.connectDB();

const app = express();

app.use(express.json());

app.post("/signup", UserController.register);
app.post("/login", UserController.login);

app.post("/create-card", CardController.createCard);
app.post("/createTransfer", TransfersController.createTransfer);

app.post("/getTransfersById", UserController.getTransfersById);

app.get("/admin/users", AdminController.getAllUsers);
app.delete("/admin/delete-user/:userId", AdminController.deleteUser);

const PORT = process.env.PORT || 3002;

app.listen(PORT, (err) => {
  console.log(`Server started on port ${PORT}`);
  if (err) {
    return console.log(err);
  }
});
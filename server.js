import express from 'express';
import * as connectDB from './db.js';
import cors from 'cors';
import * as UserController from './controllers/UserController.js';
import * as CardController from './controllers/CardController.js';
import * as TransfersController from './controllers/TransfersController.js';

connectDB.connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/existenceCheck', UserController.register);
app.post('/signup', UserController.register);
app.post('/create-card', CardController.createCard);
app.post('/login', UserController.login);
app.post('/createTransfer', TransfersController.createTransfer);
app.post('/getTransfersById', UserController.getTransfersById);

app.post('/getTransfersById', UserController.getTransfersById);

const PORT = process.env.PORT || 3002;

app.listen(PORT, (err) => {
  console.log(`Server started on port ${PORT}`);
  if (err) {
    return console.log(err);
  }
});

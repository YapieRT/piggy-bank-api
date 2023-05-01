import Transfer from "../models/Transfer.js";
import User from "../models/User.js"
import Card from "../models/Card.js"


export const createTransfer = async (req, res) => {
  try {
    const { id_sender, id_receiver, sum_transfer } = req.body;

    if (!id_sender || !id_receiver || !sum_transfer) {
      return res.status(400).json({
        message:
          "Не вдалось створити переказ. Перевірте, що всі обов'язкові поля заповнені",
      });
    }

    const IsUserSender = await User.exists({ _id : id_sender});
    if(!IsUserSender) return res.status(400).json({ message: "Даного користувача не існує." });

    const IsUserReceiver = await User.exists({ _id : id_receiver});
    if(!IsUserReceiver) return res.status(400).json({ message: "Даного користувача не існує." });

    let cardSender = await Card.findOne({userId: id_sender});
    let balanceSender = cardSender.get('balance');
    //console.log(`Sender balance: ${balanceSender}`);

    let cardReceiver = await Card.findOne({userId: id_receiver});
    let balanceReceiver = cardReceiver.get('balance');
    //console.log(`Receiver balance: ${balanceReceiver}`);

    if(balanceSender >= sum_transfer){
      await cardSender.updateOne({balance: balanceSender - sum_transfer});
      await cardReceiver.updateOne({balance: balanceReceiver + sum_transfer});
    }

    const transfer = new Transfer(req.body);
    await transfer.save();
    res.status(201).json({ message: "Переказ було створено успішно" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Помилка переказу" });
  }
};

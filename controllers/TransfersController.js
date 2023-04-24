import Transfers from "../models/Transfers.js";

export const createTransfer = async (req, res) => {
  try {
    const { id_transfer, id_sender, id_receiver, sum_transfer } = req.body;

    if (!id_transfer || !id_sender || !id_receiver || !sum_transfer) {
      return res.status(400).json({
        message:
          "Не вдалось створити переказ. Перевірте, що всі обов'язкові поля заповнені",
      });
    }

    const transfer = new Transfers(req.body);
    await transfer.save();
    res.status(201).json({ message: "Переказ було створено успішно" });
  } catch (error) {
    res.status(500).json({ message: "Помилка переказу" });
  }
};

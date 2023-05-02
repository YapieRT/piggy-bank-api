import Card from "../models/Card.js";
import User from "../models/User.js"

export const getAllUsers = async (req, res) => {
    let cards = await Card.find();
    for(let i = 0; i < cards.length; i++){
        await cards[i].populate('userId', "name surname birth_date email address ");
    }
    res.status(200).json({ 
        message: "Success",
        usersCards: cards
    });
}

export const deleteUser = async (req, res) => {
    try{
        const userId = req.params.userId;
        const user = await User.findOneAndDelete({_id: userId});
        res.status(200).json({ 
            message: "Користувача успішно видалено",
            user: user
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
          message: "Не вдалося видалити користувача.",
        });
    }
}
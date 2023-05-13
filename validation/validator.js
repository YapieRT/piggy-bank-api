import { body } from "express-validator";

export const registerValidator = () => {
    return [
        body('name', 'Переконайтесь, що ім\'я введено коректно').not().isEmpty(),
        body('surname', 'Переконайтесь, що прізвище введено коректно').not().isEmpty(),
        body('birth_date', 'Переконайтесь, що дата народження введена коректно (формат: YYYY-MM-DD)').isDate({ format: 'YYYY-MM-DD' }),
        body('phone_number', 'Переконайтеся, що номер телефону введений коректно').matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}$/),
        body('address', 'Переконайтесь, що адреса введена коректно').not().isEmpty(),
        body('email', 'Переконайтеся, що пошта введена коректно').isEmail(),
        body('password', 'Пароль має містити щонайменше 5 символів').isLength({min:5}),
    ]
};
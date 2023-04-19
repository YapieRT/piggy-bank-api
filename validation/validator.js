export const registerValidator = [
    body('name', '').isLength({min:3}),
    body('surname', '').isLength({min:3}),
    body('birth_date').isDate({ format: 'YYYY-MM-DD' }),
    body('phone_number').matches(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}$/),
    //body('address', '')
    body('email', 'Переконайтеся, що пошта введена коректно').isEmail(),
    body('password', 'Пароль має містити щонайменше 5 символів').isLength({min:5}),
];

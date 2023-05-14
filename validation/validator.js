import { body } from 'express-validator';

export const registerValidator = () => {
  return [
    body('name', 'Make sure the name is entered correctly.').not().isEmpty(),
    body('surname', 'Make sure that the last name is entered correctly.').not().isEmpty(),
    body('birth_date', 'Make sure that the date of birth is entered correctly (format: YYYY-MM-DD).').isDate({
      format: 'YYYY-MM-DD',
    }),
    body('phone_number', 'Make sure the phone number is entered correctly.').matches(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}$/
    ),
    body('address', 'Make sure the address is entered correctly.').not().isEmpty(),
    body('email', 'Make sure that the email is entered correctly.').isEmail(),
    body('password', 'Password must contain at least 5 characters.').isLength({ min: 5 }),
  ];
};

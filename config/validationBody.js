const {body} = require('express-validator');

exports.loginValidator = [
    body('username', 'Invalid does not Empty').not().isEmpty(),
    body('password', 'The minimum password length is 6 characters').isLength({min: 6}),
]

exports.createUserValidator = [
    body('username', 'username does not Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail(),
    body('password', 'password does not Empty').not().isEmpty(),
    body('password', 'The minimum password length is 6 characters').isLength({min: 6}),
]

exports.validateUpdateBook = [
    body('title').optional().trim().notEmpty().withMessage('Title cannot be empty.'),
    body('description').optional().trim().notEmpty().withMessage('Description cannot be empty.'),
    body('publicationYear').optional().isInt({ min: 0 }).withMessage('Publication year must be a positive integer.'),
    body('category').optional().isInt({ min: 1 }).withMessage('Category must be a valid ID.'),
    body('cover_url').optional().isString().withMessage('Cover URL must be a string.'),
    body('file_url').optional().isString().withMessage('File URL must be a string.'),
    body('authors').optional().isArray().withMessage('Authors must be an array of IDs.'),
]
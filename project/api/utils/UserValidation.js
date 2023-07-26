const { check, validationResult } = require('express-validator');

exports.register = [
    check('Email', 'Email length should be 4 to 30 characters').isEmail().isLength({ max: 30 }), 
    check('UserName', 'Name length should be 3 to 20 characters').isLength({ max: 20 }), 
    check('DOB', 'You should enter a valid date of birth').trim().isDate(),
    check('Designation','designation is missing').isLength({ min: 1, max: 20 })
    , (req, res, next) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            res.status(500).send(error)
        }
        else {
            next();
        }
    }
];
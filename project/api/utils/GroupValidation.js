const { check, validationResult } = require('express-validator');

exports.register = [
    check('GroupName', 'Group Name should be 2 to 30 characters').isLength({ min: 2, max: 30 }),
    check('GroupType', 'Check Group Type').isLength({ min: 2, max: 30 })
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





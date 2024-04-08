const { body, validationResult } = require('express-validator');
const HTTP_STATUS = require('../utils/httpStatus');
const { TASK_STATUS } = require('../utils/enums');

const validateTask = [
  // Validate and sanitize input fields
  body('title').trim().notEmpty().withMessage('Title is required').escape(),
  body('description').optional().trim().escape(),
  body('status').trim().isIn(TASK_STATUS).withMessage('Invalid status').escape(),

  // Check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HTTP_STATUS.BAD_REQUEST).json({ 
        status: 'error',
        errors: errors.array() 
      });
    }
    // If all validation passes, move to the next middleware
    next();
  }
];

module.exports = {
  validateTask
};

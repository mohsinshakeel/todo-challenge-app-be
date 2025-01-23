import { body } from 'express-validator';
import { Status } from '../../types';
import { VALIDATION_CONSTANTS } from '../../constants';

const statusValues = Object.values(Status).join(', ');

console.log(statusValues);

export const validateCreateTask = () => [
  body('title').notEmpty().withMessage(VALIDATION_CONSTANTS.TITLE.MESSAGE),
  body('status')
    .notEmpty()
    .isIn(Object.values(Status))
    .withMessage(VALIDATION_CONSTANTS.STATUS.INVALID)
    .withMessage(VALIDATION_CONSTANTS.STATUS.REQUIRED),
  body('color').optional(),
];

export const validateUpdateTask = () => [
  body('title').optional(),
  body('status').optional().isIn(Object.values(Status)).withMessage(VALIDATION_CONSTANTS.STATUS.INVALID),
  body('color').optional(),
];

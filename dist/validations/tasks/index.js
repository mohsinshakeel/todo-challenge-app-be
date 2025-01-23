"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateTask = exports.validateCreateTask = void 0;
const express_validator_1 = require("express-validator");
const types_1 = require("../../types");
const constants_1 = require("../../constants");
const statusValues = Object.values(types_1.Status).join(', ');
console.log(statusValues);
const validateCreateTask = () => [
    (0, express_validator_1.body)('title').notEmpty().withMessage(constants_1.VALIDATION_CONSTANTS.TITLE.MESSAGE),
    (0, express_validator_1.body)('status')
        .notEmpty()
        .isIn(Object.values(types_1.Status))
        .withMessage(constants_1.VALIDATION_CONSTANTS.STATUS.INVALID)
        .withMessage(constants_1.VALIDATION_CONSTANTS.STATUS.REQUIRED),
    (0, express_validator_1.body)('color').optional(),
];
exports.validateCreateTask = validateCreateTask;
const validateUpdateTask = () => [
    (0, express_validator_1.body)('title').optional(),
    (0, express_validator_1.body)('status').optional().isIn(Object.values(types_1.Status)).withMessage(constants_1.VALIDATION_CONSTANTS.STATUS.INVALID),
    (0, express_validator_1.body)('color').optional(),
];
exports.validateUpdateTask = validateUpdateTask;

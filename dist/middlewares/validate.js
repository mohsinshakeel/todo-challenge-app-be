"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const types_1 = require("../types");
const validate = (validations) => {
    // @ts-expect-error - This fix "Not all code paths return a value" error
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        for (const validation of validations) {
            const result = yield validation.run(req);
            if (!result.isEmpty()) {
                return res.status(types_1.StatusCodes.BAD_REQUEST).json({ errors: result.array() });
            }
        }
        next();
    });
};
exports.validate = validate;

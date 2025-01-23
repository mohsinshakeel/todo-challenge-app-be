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
const types_1 = require("../../types");
const constants_1 = require("../../constants");
const middlewares_1 = require("../../middlewares");
const validations_1 = require("../../validations");
const services_1 = require("../../services");
class TaskController {
    constructor() {
        this.createTask = [
            (0, middlewares_1.validate)((0, validations_1.validateCreateTask)()),
            (req, res) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const newTask = yield services_1.TaskService.createTask(req.body);
                    return res.status(types_1.StatusCodes.OK).json({ message: constants_1.SUCCESS_MESSAGES.TASK_CREATED_SUCCESS, data: newTask });
                }
                catch (error) {
                    return res.status(types_1.StatusCodes.BAD_REQUEST).json({
                        error: constants_1.ERROR_MESSAGES.UNABLE_TO_CREATE,
                        details: error.message,
                    });
                }
            }),
        ];
        this.getAllTasks = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield services_1.TaskService.getAllTasks();
                return res.status(types_1.StatusCodes.OK).json({ message: constants_1.SUCCESS_MESSAGES.TASK_FETCHED_SUCCESS, data: tasks });
            }
            catch (error) {
                return res.status(types_1.StatusCodes.BAD_REQUEST).json({
                    error: constants_1.ERROR_MESSAGES.FAILED_TO_FETCH_TASK_DATA,
                    details: error.message,
                });
            }
        });
        this.getTaskById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const task = yield services_1.TaskService.getTaskById(req.params.id);
                if (!task) {
                    return res.status(types_1.StatusCodes.NOT_FOUND).json({ error: constants_1.ERROR_MESSAGES.TASK_RECORD_NOT_FOUND });
                }
                return res.status(types_1.StatusCodes.OK).json({ message: constants_1.SUCCESS_MESSAGES.TASK_FETCHED_SUCCESS, data: task });
            }
            catch (error) {
                return res.status(types_1.StatusCodes.BAD_REQUEST).json({
                    error: constants_1.ERROR_MESSAGES.FAILED_TO_FETCH_TASK_DATA,
                    details: error.message,
                });
            }
        });
        this.updateTask = [
            (0, middlewares_1.validate)((0, validations_1.validateUpdateTask)()),
            (req, res) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const updatedTask = yield services_1.TaskService.updateTask(req.params.id, req.body);
                    return res.status(types_1.StatusCodes.OK).json({ message: constants_1.SUCCESS_MESSAGES.TASK_UPDATED_SUCCESS, data: updatedTask });
                }
                catch (error) {
                    return res.status(types_1.StatusCodes.BAD_REQUEST).json({
                        error: constants_1.ERROR_MESSAGES.FAILED_TO_UPDATE_TASK_DATA,
                        details: error.message,
                    });
                }
            }),
        ];
        this.deleteTask = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield services_1.TaskService.deleteTask(req.params.id);
                return res.status(types_1.StatusCodes.OK).json({ message: constants_1.SUCCESS_MESSAGES.TASK_DELETED_SUCCESS });
            }
            catch (error) {
                return res.status(types_1.StatusCodes.BAD_REQUEST).json({
                    error: constants_1.ERROR_MESSAGES.FAILED_TO_DELETE_TASK_RECORD,
                    details: error.message,
                });
            }
        });
    }
}
exports.default = new TaskController();

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
class TaskRouter {
    constructor() {
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/', controllers_1.TaskController.createTask);
        this.router.get('/', controllers_1.TaskController.getAllTasks);
        this.router.get('/:id', controllers_1.TaskController.getTaskById);
        this.router.put('/:id', controllers_1.TaskController.updateTask);
        this.router.delete('/:id', controllers_1.TaskController.deleteTask);
    }
    getRouter() {
        return this.router;
    }
}
exports.default = new TaskRouter().getRouter();

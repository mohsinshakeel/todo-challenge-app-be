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
const db_1 = require("../../db");
class TaskService {
    constructor() {
        this.prisma = db_1.PrismaService.getInstance();
    }
    createTask(taskData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.tasks.create({
                data: taskData,
            });
        });
    }
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.tasks.findMany();
        });
    }
    getTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.tasks.findUnique({
                where: { id },
            });
        });
    }
    updateTask(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.tasks.update({
                where: { id },
                data: updateData,
            });
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.tasks.delete({
                where: { id },
            });
        });
    }
}
exports.default = new TaskService();

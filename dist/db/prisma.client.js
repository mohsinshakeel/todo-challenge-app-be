"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class PrismaService {
    constructor() { }
    static getInstance() {
        if (!PrismaService.instance) {
            PrismaService.instance = new client_1.PrismaClient();
        }
        return PrismaService.instance;
    }
}
exports.default = PrismaService;

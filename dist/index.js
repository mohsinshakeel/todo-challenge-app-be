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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = __importDefault(require("http"));
const router_1 = __importDefault(require("./router"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerConfig_1 = __importDefault(require("./swaggerConfig"));
const db_1 = require("./db");
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: ['http://localhost:7100', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}));
app.use(body_parser_1.default.json());
// Setup Swagger
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerConfig_1.default));
// HTTP Server Setup
const server = http_1.default.createServer(app);
server.listen(process.env.PORT || 8080, () => {
    const host = process.env.HOST || 'localhost';
    const port = process.env.PORT || 8080;
    console.log(`Server is running on http://${host}:${port}`);
    console.log(`Swagger URL: http://${host}:${port}/api-docs`);
});
const prisma = db_1.PrismaService.getInstance();
// Prisma Connection Health Check
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.$connect();
        console.log('✨ Prisma connected to database successfully');
    }
    catch (error) {
        console.error('❌ Prisma connection error:', error.message);
        process.exit(1);
    }
});
// Call connectDB function
connectDB();
// Add health check route
app.get('/api/health', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.$queryRaw `SELECT 1`; // Simple query to check database connection
        res.json({
            status: 'success',
            server: 'running',
            database: 'connected',
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Database connection failed',
            details: error.message,
        });
    }
}));
// Graceful shutdown
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
    console.log('🛑 Prisma disconnected. Exiting gracefully...');
    process.exit(0);
}));
// Set up Routes
app.use('/', router_1.default); // Set up your application routes

import dotenv from 'dotenv';
dotenv.config();

import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';

import router from './router';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swaggerConfig';
import { PrismaService } from './db';

const app: Express = express();

// Middleware
app.use(
  cors({
    origin: ['http://localhost:7100', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  }),
);

app.use(bodyParser.json());

// Setup Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// HTTP Server Setup
const server = http.createServer(app);

server.listen(process.env.PORT || 8080, () => {
  const host = process.env.HOST || 'localhost';
  const port = process.env.PORT || 8080;
  console.log(`Server is running on http://${host}:${port}`);
  console.log(`Swagger URL: http://${host}:${port}/api-docs`);
});

const prisma = PrismaService.getInstance();

// Prisma Connection Health Check
const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('✨ Prisma connected to database successfully');
  } catch (error: any) {
    console.error('❌ Prisma connection error:', error.message);
    process.exit(1);
  }
};

// Call connectDB function
connectDB();

// Add health check route
app.get('/api/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`; // Simple query to check database connection
    res.json({
      status: 'success',
      server: 'running',
      database: 'connected',
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
      details: error.message,
    });
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('🛑 Prisma disconnected. Exiting gracefully...');
  process.exit(0);
});

// Set up Routes
app.use('/', router); // Set up your application routes

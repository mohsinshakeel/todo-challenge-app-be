import express, { Router } from 'express';
import TaskRouter from './tasks';

class AppRouter {
  private router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use('/tasks', TaskRouter);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default new AppRouter().getRouter();

import express, { Router } from 'express';
import { TaskController } from '../controllers';
class TaskRouter {
  private router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', TaskController.createTask);
    this.router.get('/', TaskController.getAllTasks);
    this.router.get('/:id', TaskController.getTaskById);
    this.router.put('/:id', TaskController.updateTask);
    this.router.delete('/:id', TaskController.deleteTask);
  }

  public getRouter(): Router {
    return this.router;
  }
}

export default new TaskRouter().getRouter();

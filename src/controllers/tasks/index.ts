import { Request, Response } from 'express';
import { StatusCodes } from '../../types';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../../constants';
import { validate } from '../../middlewares';
import { validateCreateTask, validateUpdateTask } from '../../validations';
import { TaskService } from '../../services';

class TaskController {
  public createTask = [
    validate(validateCreateTask()),
    async (req: Request, res: Response): Promise<Response | void> => {
      try {
        const newTask = await TaskService.createTask(req.body);
        return res.status(StatusCodes.OK).json({ message: SUCCESS_MESSAGES.TASK_CREATED_SUCCESS, data: newTask });
      } catch (error: any) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: ERROR_MESSAGES.UNABLE_TO_CREATE,
          details: error.message,
        });
      }
    },
  ];

  public getAllTasks = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const tasks = await TaskService.getAllTasks();
      return res.status(StatusCodes.OK).json({ message: SUCCESS_MESSAGES.TASK_FETCHED_SUCCESS, data: tasks });
    } catch (error: any) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: ERROR_MESSAGES.FAILED_TO_FETCH_TASK_DATA,
        details: error.message,
      });
    }
  };

  public getTaskById = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const task = await TaskService.getTaskById(req.params.id);
      if (!task) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: ERROR_MESSAGES.TASK_RECORD_NOT_FOUND });
      }
      return res.status(StatusCodes.OK).json({ message: SUCCESS_MESSAGES.TASK_FETCHED_SUCCESS, data: task });
    } catch (error: any) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: ERROR_MESSAGES.FAILED_TO_FETCH_TASK_DATA,
        details: error.message,
      });
    }
  };

  public updateTask = [
    validate(validateUpdateTask()),
    async (req: Request, res: Response): Promise<Response | void> => {
      try {
        const updatedTask = await TaskService.updateTask(req.params.id, req.body);
        return res.status(StatusCodes.OK).json({ message: SUCCESS_MESSAGES.TASK_UPDATED_SUCCESS, data: updatedTask });
      } catch (error: any) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          error: ERROR_MESSAGES.FAILED_TO_UPDATE_TASK_DATA,
          details: error.message,
        });
      }
    },
  ];

  public deleteTask = async (req: Request, res: Response): Promise<Response | void> => {
    try {
      await TaskService.deleteTask(req.params.id);
      return res.status(StatusCodes.OK).json({ message: SUCCESS_MESSAGES.TASK_DELETED_SUCCESS });
    } catch (error: any) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: ERROR_MESSAGES.FAILED_TO_DELETE_TASK_RECORD,
        details: error.message,
      });
    }
  };
}

export default new TaskController();

import { PrismaService } from '../../db';
import { ITask } from '../../types';

class TaskService {
  private prisma;

  constructor() {
    this.prisma = PrismaService.getInstance();
  }

  public async createTask(taskData: ITask) {
    return this.prisma.tasks.create({
      data: taskData,
    });
  }

  public async getAllTasks() {
    return this.prisma.tasks.findMany();
  }

  public async getTaskById(id: string) {
    return this.prisma.tasks.findUnique({
      where: { id },
    });
  }

  public async updateTask(id: string, updateData: Partial<ITask>) {
    return this.prisma.tasks.update({
      where: { id },
      data: updateData,
    });
  }

  public async deleteTask(id: string) {
    return this.prisma.tasks.delete({
      where: { id },
    });
  }
}

export default new TaskService();

import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { PrismaService } from '../prisma/prisma.service';
import { TaskCompletedDto } from './dtos/task-completed-dto';
import { TaskDto } from './dtos/task-dto';
import { TaskUpdateDto } from './dtos/task-update-dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(TaskService.name);
    this.logger.info('TaskService inicializado');
  }

  async getAllTasks() {
    this.logger.info('Fetching all tasks');
    return await this.prisma.task.findMany();
  }

  async addTask(task: TaskDto) {
    this.logger.info('Creating a new task');
    const createdTask = await this.prisma.task.create({ data: task });
    return createdTask;
  }

  async deleteTask(id: string) {
    this.logger.info(`Deleting task`);
    await this.prisma.task.delete({ where: { id: id } });
  }

  async updateCompletedTask(id: string, task: TaskCompletedDto) {
    this.logger.info(`Updating status of the task`);
    const updatedTask = await this.prisma.task.update({
      where: { id: id },
      data: {
        ...task,
      },
    });
    return updatedTask;
  }

  async updateTask(id: string, task: TaskUpdateDto) {
    this.logger.info(`Updating task`);
    const updatedTask = await this.prisma.task.update({
      where: { id: id },
      data: {
        ...task,
      },
    });
    return updatedTask;
  }
}

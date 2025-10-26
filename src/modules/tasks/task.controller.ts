import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { TaskCompletedDto } from './dtos/task-completed-dto';
import { TaskDto } from './dtos/task-dto';
import { TaskUpdateDto } from './dtos/task-update-dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Tasks retornadas com sucesso.' })
  async getTasks() {
    return await this.taskService.getAllTasks();
  }

  @Post()
  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'Task criada com sucesso.' })
  async create(@Body() taskDto: TaskDto) {
    return await this.taskService.addTask(taskDto);
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiResponse({ status: 204, description: 'Task deletada com sucesso.' })
  async deleteTask(@Param('id') id: string) {
    return await this.taskService.deleteTask(id);
  }

  @Patch('/:id')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Campo de tarefa completa atualizada com sucesso.' })
  async updateCompleteTask(@Param('id') id: string, @Body() taskCompletedDto: TaskCompletedDto) {
    return await this.taskService.updateCompletedTask(id, taskCompletedDto);
  }

  @Put('/:id')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Task atualizada com sucesso.' })
  async updateTask(@Param('id') id: string, @Body() taskDto: TaskUpdateDto) {
    return await this.taskService.updateTask(id, taskDto);
  }
}

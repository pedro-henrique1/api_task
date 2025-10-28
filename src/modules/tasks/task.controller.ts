import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { TaskCompletedDto } from './dtos/task-completed-dto';
import { TaskDto } from './dtos/task-dto';
import { TaskUpdateDto } from './dtos/task-update-dto';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiTags('Tasks')
  @ApiOperation({
    summary: 'Retrieve all tasks',
    description: 'Fetches a list of all tasks from the system',
  })
  @ApiResponse({
    status: 200,
    description: 'A list of tasks has been successfully retrieved.',
  })
  async getTasks() {
    return await this.taskService.getAllTasks();
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new task',
    description: 'Creates a new task with the provided details',
  })
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created.',
  })
  @Throttle({ short: { limit: 5, ttl: 60 } })
  async create(@Body() taskDto: TaskDto) {
    return await this.taskService.addTask(taskDto);
  }

  @Delete('/:id')
  @ApiOperation({
    summary: 'Get a task by ID',
    description: 'Retrieves a task by its ID',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found.',
  })
  @ApiOperation({
    summary: 'Delete a task',
    description: 'Deletes a task by its ID',
  })
  @ApiResponse({
    status: 204,
    description: 'The task has been successfully deleted.',
  })
  @HttpCode(204)
  async deleteTask(@Param('id') id: string) {
    return await this.taskService.deleteTask(id);
  }

  @Patch('/:id')
  @ApiResponse({
    status: 404,
    description: 'Task not found.',
  })
  @ApiOperation({
    summary: 'Update task completion status',
    description: 'Updates the completion status of a task by its ID',
  })
  @ApiResponse({
    status: 200,
    description: 'The task completion status has been successfully updated.',
  })
  async updateCompleteTask(@Param('id') id: string, @Body() taskCompletedDto: TaskCompletedDto) {
    return await this.taskService.updateCompletedTask(id, taskCompletedDto);
  }

  @Put('/:id')
  @ApiOperation({
    summary: 'Update a task',
    description: 'Updates a task by its ID',
  })
  @ApiResponse({
    status: 200,
    description: 'The task has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found.',
  })
  async updateTask(@Param('id') id: string, @Body() taskDto: TaskUpdateDto) {
    return await this.taskService.updateTask(id, taskDto);
  }
}

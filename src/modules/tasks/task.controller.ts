import { Controller, Get } from '@nestjs/common';

@Controller('tasks')
export class TaskController {
  @Get()
  getTasks(): string {
    return 'List of tasks';
  }
}

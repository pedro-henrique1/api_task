import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common";
import { TaskCompletedDto } from "./dtos/task-completed-dto";
import { TaskDto } from "./dtos/task-dto";
import { TaskUpdateDto } from "./dtos/task-update-dto";
import { TaskService } from "./task.service";

@Controller("tasks")
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    async getTasks() {
        return await this.taskService.getAllTasks();
    }


    @Post()
    async create(@Body() taskDto: TaskDto) {
       return await this.taskService.addTask(taskDto);
    }

    @Delete("/:id")
    async deleteTask(@Param("id") id: string) {
        return await this.taskService.deleteTask(id);
    }

    @Patch("/:id")
    async updateCompleteTask(@Param("id") id: string, @Body() taskCompletedDto: TaskCompletedDto) {
        return await this.taskService.updateCompletedTask(id, taskCompletedDto);
    }

    @Put("/:id")
    async updateTask(@Param("id") id: string, @Body() taskDto: TaskUpdateDto) {
        return await this.taskService.updateTask(id, taskDto);
    }
}
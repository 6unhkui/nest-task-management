import { TaskService } from "./task.service";
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { CreateTaskDTO, UpdateTaskDTO } from "src/dtos/task.dto";

@Controller("tasks")
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get("/:id")
    public async getOne(@Param("id") taskId: number) {
        const resp = await this.taskService.getOne(taskId);
        return resp;
    }

    @Get()
    public async getAll() {
        const resp = await this.taskService.getAll();
        return resp;
    }

    @Post()
    public async createOne(@Body() createTaskRequest: CreateTaskDTO) {
        const resp = await this.taskService.createOne(createTaskRequest);
        return resp;
    }

    @Put("/:id")
    public async updateOne(@Param("id") taskId: number, @Body() updateTaskRequest: UpdateTaskDTO) {
        const resp = await this.taskService.updateOne(taskId, updateTaskRequest);
        return resp;
    }

    @Delete("/:id")
    @HttpCode(HttpStatus.NO_CONTENT)
    public async deleteOne(@Param("id") taskId: number) {
        await this.taskService.deleteOne(taskId);
    }
}

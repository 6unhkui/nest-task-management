import { CreateTaskDTO, TaskDTO, UpdateTaskDTO } from "./../dtos/task.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "src/entities/Task.entity";
import { Repository } from "typeorm";

@Injectable()
export class TaskService {
    constructor(@InjectRepository(Task) private taskRepository: Repository<Task>) {}

    public async findOne(taskId: number) {
        const task: Task = await this.taskRepository.findOne(taskId);
        if (!task) throw new NotFoundException(`Task with the id ${taskId} was not found`);

        return task.toDTO();
    }

    public async findAll() {
        const tasks: Task[] = await this.taskRepository.find();
        return tasks.map(task => task.toDTO());
    }

    public async createOne(createRequest: CreateTaskDTO) {
        const { title, description } = createRequest;
        const task = await this.taskRepository.create({ title, description }).save();

        return task.toDTO();
    }

    public async updateOne(taskId: number, updateRequest: UpdateTaskDTO) {
        const task = await this.findOne(taskId);

        task.title = updateRequest.title || task.title;
        task.description = updateRequest.description || task.description;
        task.status = updateRequest.status || task.status;

        await this.taskRepository.update({ id: taskId }, { ...task });

        return task;
    }

    public async deleteOne(taskId: number) {
        const task: Task = await this.taskRepository.findOne(taskId);
        if (!task) throw new NotFoundException(`Task with the id ${taskId} was not found`);

        task.delete();
        await this.taskRepository.update({ id: taskId }, task);
    }

    private entityToDTO(task: Task) {
        const taskDTO = new TaskDTO();
        taskDTO.id = task.id;
        taskDTO.title = task.title;
        taskDTO.description = task.description;
        taskDTO.status = task.status;
        return taskDTO;
    }
}

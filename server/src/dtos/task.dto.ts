import { IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";
import { TaskStatus, Task } from "./../entities/task.entity";

export class TaskDTO {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
}

export class CreateTaskDTO {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    title: string;
    description?: string;
}

export class UpdateTaskDTO {
    title?: string;
    description?: string;
    status?: TaskStatus;
}

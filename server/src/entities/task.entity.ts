import { TaskDTO } from "./../dtos/task.dto";
import { classToPlain } from "class-transformer";
import { Column, Entity, ManyToOne } from "typeorm";
import { AbastractEntity } from "./abstract-entity";
import { User } from "./user.entity";

export enum TaskStatus {
    Created = 0,
    InProgress = 1,
    Done = 2
}

@Entity()
export class Task extends AbastractEntity {
    @Column()
    title: string;

    @Column({ type: "text", nullable: false })
    description: string;

    @Column({ type: "smallint", default: TaskStatus.Created })
    status: TaskStatus;

    @ManyToOne(() => User, user => user.tasks, { eager: true })
    writer: User;

    toDTO() {
        const taskDTO = new TaskDTO();
        taskDTO.id = this.id;
        taskDTO.title = this.title;
        taskDTO.description = this.description;
        taskDTO.status = this.status;
        return taskDTO;
    }
}

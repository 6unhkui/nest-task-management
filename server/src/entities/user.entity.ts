import { Task } from "src/entities/Task.entity";
import { classToClass, classToPlain, Exclude } from "class-transformer";
import { IsEmail } from "class-validator";
import { BeforeInsert, Column, Entity, OneToMany } from "typeorm";
import { AbastractEntity } from "./abstract-entity";
import argon2 from "argon2";

@Entity()
export class User extends AbastractEntity {
    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    username: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ nullable: true })
    image: string | null;

    @OneToMany(() => Task, post => post.writer)
    tasks: Promise<Task[]>;

    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password);
    }

    async comparePassword(attempt: string) {
        return await argon2.verify(this.password, attempt);
    }

    toJSON() {
        return classToPlain(this);
    }
}

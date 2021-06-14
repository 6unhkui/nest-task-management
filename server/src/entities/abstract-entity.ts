import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class AbastractEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: "date", nullable: true })
    deletedAt?: Date;

    @Column({ type: "smallint", default: 0 })
    isDelete = 0;

    delete(): void {
        this.deletedAt = new Date();
        this.isDelete = 1;
    }
}

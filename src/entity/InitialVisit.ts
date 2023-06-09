import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class InitialVisit extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar", length: 255})
    initialDiagnosis!: string;
}
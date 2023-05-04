import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class Diagnosis extends BaseEntity {

    @PrimaryGeneratedColumn()
    diagnoseID!: number;

    @Column({type: "varchar", length: 255})
    diagnoseName!: string;


}
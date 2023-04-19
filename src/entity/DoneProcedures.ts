import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class DoneProcedures extends BaseEntity {

    @PrimaryGeneratedColumn()
    procedureID!: number;

    @Column({type: "varchar", length: 255})
    procedureName!: string;

    @Column({type: "varchar", length: 20})
    procedurePrice!: number;
}
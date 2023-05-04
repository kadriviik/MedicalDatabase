import {Entity, PrimaryGeneratedColumn, BaseEntity, Column} from "typeorm";

@Entity()
export class EmergencyVisit extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar", length:1000})
    emergencyDiagnosis!: string;
}
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class FollowUpVisit extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "text"})
    diagnosisStatus!: string;

    @Column({type: "varchar", length: 20})
    insuranceID!: number;
}

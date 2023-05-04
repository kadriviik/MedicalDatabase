import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn} from "typeorm";

@Entity()
export class DoctorHistory extends BaseEntity {
    @PrimaryGeneratedColumn()
    ID!: number;


    @CreateDateColumn({type: "date"})
    startDate!: Date;


    @Column({type: "date"})
    endDate!: Date;


    @Column({type: "varchar", length: 255, nullable: true})
    reasonForLeaving!: string;
}

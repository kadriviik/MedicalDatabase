import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, ManyToOne} from "typeorm";
import {Patient} from "./Patient";
import {Doctor} from "./Doctor";

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

    @ManyToOne(() => Patient, (Patient) => Patient.doctorHistory)
    patient!: Patient[];

    @ManyToOne(() => Doctor, (Doctor) => Doctor.doctorHistory)
    doctor!: Doctor[];
}

import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn} from "typeorm";
import {Patient} from "./Patient";
import {Doctor} from "./Doctor";

@Entity()
export class OfficeVisit extends BaseEntity {

    @PrimaryGeneratedColumn()
    visitID!: number;

    @Column({type: "varchar"})
    patientID!: number;

    @Column({type: "varchar"})
    doctorID!: number;

    @CreateDateColumn({type: "date"})
    dateOfVisit!: Date;

    @Column({type: "text"})
    symptoms!: string;

    @Column({type: "varchar"})
    procedureID!: number;

    @ManyToOne(() => Patient, patient => patient.officeVisits)
    patient!: Patient[];

    @ManyToOne(() => Doctor, doctor => doctor.officeVisits)
    doctor!: Doctor[];
}
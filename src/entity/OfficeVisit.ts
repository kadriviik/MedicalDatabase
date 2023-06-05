import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, CreateDateColumn} from "typeorm";
import {Patient} from "./Patient";
import {Doctor} from "./Doctor";
import {Diagnosis} from "./Diagnosis"
import {DoneProcedures} from "./DoneProcedures";

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

    @ManyToOne(() => Diagnosis, diagnosis => diagnosis.officeVisits)
    diagnosis!: Diagnosis[];

    @OneToMany (() => DoneProcedures, doneProcedures => doneProcedures.officeVisits)
    doneProcedures!: DoneProcedures[];

}
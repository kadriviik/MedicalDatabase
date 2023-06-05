import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn} from "typeorm";
import {Drug} from "./Drug";
import {Patient} from "./Patient"
import {Doctor} from "./Doctor"

@Entity()
export class Prescription extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar"})
    patientID!: string;

    @CreateDateColumn()
    prescriptionDate!: Date;

    @Column({type: "varchar", length: 255})
    prescriptionDosage!: string;

    @Column({type: "varchar", length: 255})
    prescriptionDuration!: string;

    @Column({type: "varchar"})
    doctorID!: string;

    @Column("varchar")
    drugID!: number;

    @Column()
    refillable!: boolean;

    @Column({type: "varchar", length: 255, nullable: true})
    numberOfRefills!: number;

    @ManyToOne(() => Drug, (Drug) => Drug.prescriptions)
    drug!: Drug[];

    @ManyToOne(() => Patient, (Patient) => Patient.prescriptions)
    patient!: Patient[];

    @ManyToOne(() => Doctor, (Doctor) => Doctor.prescription, )
    doctor!: Doctor;

}

import {Entity, PrimaryGeneratedColumn, OneToMany, Column, BaseEntity, ManyToOne} from "typeorm";
import { Patient } from "./Patient"
import {OfficeVisit} from "./OfficeVisit";
import {Hospital} from "./Hospital";
import {Prescription} from "./Prescription";
import {DoctorHistory} from "./DoctorHistory";

@Entity()
export class Doctor extends BaseEntity {
    @PrimaryGeneratedColumn()
    ID!: number;


    @Column({type: "varchar", length: 255})
    doctorName!: string;

    @Column({type: "varchar", length: 50})
    phoneNumber!: number;


    @Column({type: "varchar", length: 50})
    email!: string;


    @Column ({type: "varchar", length: 50, nullable: true})
    specialization!: string;

    @OneToMany (() => Patient, (patient)=> patient.doctorID)
    patient!: Patient[];

    @OneToMany(() => OfficeVisit, officeVisit => officeVisit.doctorID)
    officeVisits!: OfficeVisit[];

    @ManyToOne(() => Hospital, (Hospital) => Hospital.doctors)
    hospital!: Hospital[];

    @OneToMany(() => Prescription, prescription => prescription.drugID)
    prescription!: Prescription[];

    @OneToMany(() => DoctorHistory, doctorHistory => doctorHistory.doctor)
    doctorHistory!: DoctorHistory[];

}

import {Entity, PrimaryGeneratedColumn, OneToMany, Column, BaseEntity} from "typeorm";
import { Patient} from "./Patient";

@Entity()
export class InsuranceCompany extends BaseEntity {

    @PrimaryGeneratedColumn()
    insuranceCompanyID!: number;

    @Column({type: "varchar", length: 20})
    insuranceCompanyName!: string;

    @Column({type: "varchar", length: 20})
    phone!: number;

    @OneToMany(() => Patient, (patient) => patient.ID)
    patient!: Patient[]
}



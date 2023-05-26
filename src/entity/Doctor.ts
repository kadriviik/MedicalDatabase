import {Entity, PrimaryGeneratedColumn, OneToMany, Column, BaseEntity, ManyToOne} from "typeorm";
import { Patient } from "./Patient"

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

    @OneToMany (() => Patient, (patient)=> patient.ID)
    patient!: Patient[];

}

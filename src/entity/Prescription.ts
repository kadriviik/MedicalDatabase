import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class Prescription extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;


    @Column({type: "varchar", length: 255})
    patientID!: string;


    @Column({type: "date"})
    prescriptionDate!: Date;


    @Column({type: "varchar", length: 255})
    prescriptionDosage!: string;


    @Column({type: "varchar", length: 255})
    prescriptionDuration!: string;


    @Column({type: "varchar", length: 255})
    doctorID!: string;


    @Column({type: "varchar", length: 255})
    drugID!: string;


    @Column({type: "varchar", length: 255})
    prescriptionType!: string;


    @Column({type: "varchar", length: 255, nullable: true})
    numberOfRefills!: number;


}

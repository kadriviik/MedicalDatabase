import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn} from "typeorm";

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


}

import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class OfficeVisit extends BaseEntity {

    @PrimaryGeneratedColumn()
    visitID!: number;

    @Column({type: "varchar", length: 20})
    patientID!: number;

    @Column({type: "varchar", length: 20})
    doctorID!: number;

    @Column({type: "date"})
    dateOfVisit!: Date;

    @Column({type: "text"})
    symptoms!: string;

    @Column({type: "varchar"})
    procedureID!: number;
}
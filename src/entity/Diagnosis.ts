import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import {OfficeVisit} from "./OfficeVisit";

@Entity()
export class Diagnosis extends BaseEntity {

    @PrimaryGeneratedColumn()
    diagnoseID!: number;

    @Column({type: "varchar", length: 255})
    diagnoseName!: string;

    @OneToMany(() => OfficeVisit, officeVisit => officeVisit.diagnosis)
    officeVisits!: OfficeVisit[];


}
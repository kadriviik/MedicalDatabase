import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import {OfficeVisit} from "./OfficeVisit";

@Entity()
export class DoneProcedures extends BaseEntity {

    @PrimaryGeneratedColumn()
    procedureID!: number;

    @Column({type: "varchar", length: 255})
    procedureName!: string;

    @Column({type: "varchar", length: 20})
    procedurePrice!: number;

    @ManyToOne (() => OfficeVisit, officeVisits => officeVisits.doneProcedures)
    officeVisits!: OfficeVisit[];
}
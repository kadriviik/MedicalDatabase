import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import {Doctor} from "./Doctor";
import {InsuranceCompany} from "./InsuranceCompany";

@Entity()
export class Patient extends BaseEntity {

    @PrimaryGeneratedColumn()
    ID!: number;

    @Column({type: "varchar", length: 200})
    name!: string;

    @Column({type: "varchar", length: 20})
    insuranceID!: number;

    @Column({type: "varchar", length: 20})
    holderID!: number;


    @Column({type: "varchar"})
    address!: string;

    @Column({type: "varchar", length: 50})
    phone!: number;

    @Column({type:"varchar", nullable: true})
    email!: string;

    @Column ({type:"varchar"})
    doctorID!: number;

    @Column ({type: "varchar", nullable: true})
    insuranceCompanyID!: number;

    @ManyToOne(() => Doctor, (doctor) => doctor.patient)
    doctor!: Doctor

    @ManyToOne(() => InsuranceCompany, (InsuranceCompany) => InsuranceCompany.patient)
    insuranceCompany!: InsuranceCompany[]
}

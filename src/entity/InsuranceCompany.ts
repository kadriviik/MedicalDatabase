import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class InsuranceCompany extends BaseEntity {

    @PrimaryGeneratedColumn()
    insuranceCompanyID!: number;

    @Column({type: "varchar", length: 20})
    insuranceCompanyName!: string;

    @Column({type: "varchar", length: 20})
    phone!: number;
}



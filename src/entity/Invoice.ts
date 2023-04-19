import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class Invoice extends BaseEntity {

    @PrimaryGeneratedColumn()
    invoiceID!: number;

    @Column({type: "varchar"})
    procedureID!: number;

    @Column({type: "date"})
    paymentDate!: Date;
}
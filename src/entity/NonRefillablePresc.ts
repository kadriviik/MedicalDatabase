import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class NonRefillablePresc extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;


    @Column({type: "varchar", length: 255})
    prescriptionID!: string;


    @Column ({type: "varchar", length: 255})
    reasonForNonRefillable!: string;


}

import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class RefillablePrescription extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar", length: 255})
    prescriptionID!: string;

    @Column({type: "varchar", length: 255})
    numberOfRefills!: string;

    @Column({type: "varchar", length: 255})
    sizeOfRefill!: string;
}




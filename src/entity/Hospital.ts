import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import {Doctor} from "./Doctor";

@Entity()
export class Hospital extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar", length: 255})
    hospitalName!: string;

    @Column({type: "varchar", length: 255})
    hospitalAddress!: string;

    @Column({type: "varchar", length: 255})
    hospitalPhoneNumber!: string;

    @OneToMany(() => Doctor, doctor => doctor.hospital)
    doctors!: Doctor[];

}

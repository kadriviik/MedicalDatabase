import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

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


}

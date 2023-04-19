import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class Drug extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;


    @Column({type: "varchar", length: 255})
    drugName!: string;


    @Column({type: "varchar", length: 255})
    drugDescription!: string;


    @Column({type: "varchar", length: 255, nullable: true})
    drugSideEffects!: string;
}

import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class doctorHistory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;


    @Column({type: "date"})
    startDate!: Date;


    @Column({type: "date"})
    endDate!: Date;


    @Column({type: "varchar", length: 255, nullable: true})
    reasonForLeaving!: string;
}

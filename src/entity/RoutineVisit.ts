import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class RoutineVisit extends BaseEntity {

    @PrimaryGeneratedColumn()
    routineVisitID!: number;

    @Column({type: "varchar", length: 255, nullable:true})
    bloodPressure!: string;

    @Column({type: "varchar", length: 10, nullable:true})
    weight!: number;

    @Column({type: "varchar", length: 10, nullable:true})
    height!: number;

    @Column({type: "varchar", length: 255, nullable:true})
    diagnosis!: string;
}
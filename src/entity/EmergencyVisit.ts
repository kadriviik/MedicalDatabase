import {Entity, PrimaryGeneratedColumn, BaseEntity} from "typeorm";

@Entity()
export class EmergencyVisit extends BaseEntity {

    @PrimaryGeneratedColumn()
    diagnoseID!: number;
}
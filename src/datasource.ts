import {DataSource} from "typeorm";
import {config} from "./config";
import { Patient } from "./entity/Patient";
import { Doctor } from "./entity/Doctor";
import {Diagnosis} from "./entity/Diagnosis";
import {InsuranceCompany} from "./entity/InsuranceCompany";
import {doctorHistory} from "./entity/DoctorHistory";
import {Hospital} from "./entity/Hospital";
import {DoneProcedures} from "./entity/DoneProcedures";
import {Drug} from "./entity/Drug";
import {EmergencyVisit} from "./entity/EmergencyVisit";
import {FollowUpVisit} from "./entity/FollowUpVisit";
import {InitialVisit} from "./entity/InitialVisit";
import {Invoice} from "./entity/Invoice";
import {NonRefillablePresc} from "./entity/NonRefillablePresc";
import {OfficeVisit} from "./entity/OfficeVisit";
import {Prescription} from "./entity/Prescription";
import {RefillablePrescription} from "./entity/RefillablePrescription";
import {RoutineVisit} from "./entity/RoutineVisit";



const defaultDataSource = new DataSource({
    type: "postgres",
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.db,
    entities: [Patient, Doctor, Diagnosis, doctorHistory, InsuranceCompany, Hospital, DoneProcedures, Drug, EmergencyVisit, FollowUpVisit, InitialVisit, RoutineVisit, Invoice, NonRefillablePresc, OfficeVisit, Prescription, RefillablePrescription],
    synchronize: true,
});

defaultDataSource
    .initialize()
    .then(() => {
        console.log("Database initialized...");
    })
    .catch((err) => {
        console.log("Error initializing database", err);
    });

export default  defaultDataSource;
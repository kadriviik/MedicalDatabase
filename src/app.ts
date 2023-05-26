import express from 'express';
import "reflect-metadata";
import patientRouter from "./routes/Patient.router";
import doctorRouter from "./routes/Doctor.router"
import diagnosisRouter from "./routes/Diagnosis.router";
import doctorHistoryRouter from "./routes/DoctorHistory.router";
import doneProceduresRouter from "./routes/DoneProcedures.router";
import drugRouter from "./routes/Drug.router";
import emergencyVisitRouter from "./routes/EmergencyVisit.router";
import followUpVisitRouter from "./routes/FollowUpVisit.router";
import hospitalRouter from "./routes/Hospital.router";
import initialVisitRouter from "./routes/InitialVisit.router";
import insuranceCompanyRouter from "./routes/InsuranceCompany.router";
import officeVisitRouter from "./routes/OfficeVisit.router";
import prescriptionRouter from "./routes/Prescription.router";
import routineVisitRouter from "./routes/RoutineVisit.router";

const app = express();

app.get("/api", (req, res) => {
    // output APIdoc page
    res.end("Hello");
});

// GET - info päring (kõik artiklid)
app.use("/api/patients",patientRouter );
app.use("/api/doctors",doctorRouter );
app.use("/api/doctorHistory", doctorHistoryRouter);
app.use("/api/diagnosis", diagnosisRouter);
app.use("api/doneProcedures", doneProceduresRouter);
app.use("api/drugs", drugRouter);
app.use("api/emergencyVisit", emergencyVisitRouter);
app.use("api/followUpVisit", followUpVisitRouter);
app.use("api/hospital", hospitalRouter);
app.use("api/initialVisit", initialVisitRouter);
app.use("api/insuranceCompany", insuranceCompanyRouter);
app.use("api/officeVisit", officeVisitRouter);
app.use("api/prescription", prescriptionRouter);
app.use("api/routineVisit", routineVisitRouter);

export default app;
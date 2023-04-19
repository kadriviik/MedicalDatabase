import express from 'express';
import "reflect-metadata";
import patientRouter from "./routes/Patient.router";
import doctorRouter from "./routes/Doctor.router"

const app = express();

app.get("/api", (req, res) => {
    // output APIdoc page
    res.end("Hello");
});

// GET - info päring (kõik artiklid)
app.use("/api/patients",patientRouter );
app.use("/api/doctors",doctorRouter );

export default app;
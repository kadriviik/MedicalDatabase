import express from 'express';
import defaultDataSource from '../datasource';
import { Prescription } from '../entity/Prescription';


const router = express.Router();

interface CreatePrescriptionParams {
    id: number;
    patientID: string;
    prescriptionDate: Date;
    prescriptionDosage: string;
    prescriptionDuration: string;
    doctorID: string;
    drugID: number;
    refillable: boolean;
    numberOfRefills: number;
}

interface UpdatePrescriptionParams {
    id?: number;
    patientID?: string;
    prescriptionDate?: Date;
    prescriptionDosage?: string;
    prescriptionDuration?: string;
    doctorID?: string;
    drugID?: number;
    refillable?: boolean;
    numberOfRefills?: number;
}

// GET - info päring (kõik retseptid)
router.get("/", async (req, res) => {
    try {
        // küsi tehtud protseduure andmebaasist
        const prescriptions = await defaultDataSource.getRepository(Prescription);

        // vasta kogumikuga JSON formaadis
        return res.status(200).json({ data: prescriptions });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch prescriptions" });
    }
});


// POST - saadab infot
router.post("/", async (req, res) => {
    try {
        const { id, patientID, prescriptionDate, prescriptionDosage, prescriptionDuration, doctorID, drugID, refillable } = req.body as CreatePrescriptionParams;


        if ( !id || !patientID || !prescriptionDate || !prescriptionDosage || !prescriptionDuration || !doctorID || !drugID || !refillable) {
            return res
                .status(400)
                .json({ error: "Prescriptions must have some more data" });
        }


        // create new prescriptions with given parameters
        const prescription= Prescription.create({
            patientID: patientID.trim() ?? "",
            prescriptionDosage: prescriptionDosage.trim() ?? "",
            prescriptionDuration: prescriptionDuration.trim() ?? "",
            doctorID: doctorID.trim() ?? "",
        });

        //save prescription to database
        const result = await prescription.save();

        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch prescriptions" });
    }
});

// GET - info päring (üksik retsept)
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const prescription= await defaultDataSource
            .getRepository(Prescription)
            .findOneBy({ id: parseInt(id) });

        return res.status(200).json({ data: prescription});
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch prescriptions" });
    }
});

// PUT - update
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { patientID } = req.body as UpdatePrescriptionParams;
        const { prescriptionDate } = req.body as UpdatePrescriptionParams;
        const { prescriptionDuration } = req.body as UpdatePrescriptionParams;
        const { prescriptionDosage } = req.body as UpdatePrescriptionParams;
        const { refillable } = req.body as UpdatePrescriptionParams;
        const { numberOfRefills } = req.body as UpdatePrescriptionParams;

        const prescription= await defaultDataSource
            .getRepository(Prescription)
            .findOneBy({ id: parseInt(id) });

        if (!prescription) {
            return res.status(404).json({ error: "Prescription not found" });
        }


        // uuendame andmed objektis (lokaalne muudatus)
        prescription.patientID = patientID ? patientID : prescription.patientID;
        prescription.prescriptionDate = prescriptionDate ? prescriptionDate : prescription.prescriptionDate;
        prescription.prescriptionDosage = prescriptionDosage ? prescriptionDosage : prescription.prescriptionDosage;
        prescription.prescriptionDuration = prescriptionDuration ? prescriptionDuration : prescription.prescriptionDuration;
        prescription.refillable = refillable ? refillable : prescription.refillable;
        prescription.numberOfRefills = numberOfRefills ? numberOfRefills : prescription.numberOfRefills;

        //salvestame muudatused andmebaasi
        const result = await prescription.save();

        // saadame vastu uuendatud andmed (kui midagi töödeldakse serveris on seda vaja kuvada)
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not update prescriptions" });
    }
});

// DELETE - kustutamine
router.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;

        const prescription= await defaultDataSource
            .getRepository(Prescription)
            .findOneBy({ id: parseInt(id) });

        if (!prescription) {
            return res.status(404).json({ error: "Prescription not found" });
        }

        const result = await prescription.remove();

        // tagastame igaks juhuks kustutatud andmed
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not update prescriptions" });
    }
});

export default router;
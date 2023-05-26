import express from 'express';
import defaultDataSource from '../datasource';
import { OfficeVisit } from '../entity/OfficeVisit';


const router = express.Router();

interface CreateOfficeVisitParams {
    visitID: number;
    patientID: number;
    doctorID: number;
    dateOfVisit: Date;
    symptoms: string;
    procedureID: number;
}

interface UpdateFollowUpVisitParams {
    visitID?: number;
    patientID?: number;
    doctorID?: number;
    dateOfVisit?: Date;
    symptoms?: string;
    procedureID?: number;
}

// GET - info päring (kõik office visitid)
router.get("/", async (req, res) => {
    try {
        // küsi tehtud visiteid andmebaasist
        const officeVisit = await defaultDataSource.getRepository(OfficeVisit);

        // vasta visitite kogumikuga JSON formaadis
        return res.status(200).json({ data: officeVisit });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch office visits" });
    }
});


// POST - saadab infot
router.post("/", async (req, res) => {
    try {
        const { visitID, patientID, dateOfVisit, doctorID, symptoms, procedureID } = req.body as CreateOfficeVisitParams;


        if (!visitID || !patientID || !dateOfVisit || !doctorID || !symptoms || !procedureID) {
            return res
                .status(400)
                .json({ error: "Office visits must have id and name" });
        }

        // create new initial visits with given parameters
        const officeVisit= OfficeVisit.create({
            visitID: visitID ?? "",
            patientID: patientID ?? "",
            dateOfVisit: dateOfVisit ?? "",
            symptoms: symptoms.trim() ?? "",
            procedureID: procedureID ?? "",
        });

        //save office visit to database
        const result = await officeVisit.save();

        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch follow up visits" });
    }
});

// GET - info päring (üksik follow up visit)
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const followUpVisit= await defaultDataSource
            .getRepository(OfficeVisit)
            .findOneBy({ visitID: parseInt(id) });

        return res.status(200).json({ data: followUpVisit});
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch follow up visits" });
    }
});

// PUT - update
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { patientID, dateOfVisit, visitID, symptoms, procedureID, doctorID } = req.body as UpdateFollowUpVisitParams;

        const officeVisit= await defaultDataSource
            .getRepository(OfficeVisit)
            .findOneBy({ visitID: parseInt(id) });

        if (!officeVisit) {
            return res.status(404).json({ error: "Visit not found" });
        }


        // uuendame andmed objektis (lokaalne muudatus)
        officeVisit.patientID = patientID ? patientID : officeVisit.patientID;
        officeVisit.dateOfVisit = dateOfVisit ? dateOfVisit : officeVisit.dateOfVisit;
        officeVisit.visitID = visitID ? visitID : officeVisit.visitID;
        officeVisit.symptoms = symptoms ? symptoms : officeVisit.symptoms;
        officeVisit.procedureID = procedureID ? procedureID : officeVisit.procedureID;
        officeVisit.doctorID = doctorID ? doctorID : officeVisit.doctorID;

        //salvestame muudatused andmebaasi
        const result = await officeVisit.save();

        // saadame vastu uuendatud andmed (kui midagi töödeldakse serveris on seda vaja kuvada)
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not update visit" });
    }
});

// DELETE - kustutamine
router.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;

        const officeVisit= await defaultDataSource
            .getRepository(OfficeVisit)
            .findOneBy({ visitID: parseInt(id) });

        if (!officeVisit) {
            return res.status(404).json({ error: "Visit not found" });
        }

        const result = await officeVisit.remove();

        // tagastame igaks juhuks kustutatud andmed
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not update visits" });
    }
});

export default router;
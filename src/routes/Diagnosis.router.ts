import express from 'express';
import defaultDataSource from '../datasource';
import { Diagnosis } from '../entity/Diagnosis';


const router = express.Router();

interface CreateDiagnosisParams {
    diagnoseID: number;
    diagnoseName: string;
}

interface UpdateDiagnosisParams {
    diagnoseID?: number;
    diagnoseName?: string;

}

// GET - info päring (kõik diagnoosid)
router.get("/", async (req, res) => {
    try {
        // küsi diagnoose andmebaasist
        const diagnoses = await defaultDataSource.getRepository(Diagnosis);

        // vasta diagnoosi kogumikuga JSON formaadis
        return res.status(200).json({ data: diagnoses });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch diagnosis" });
    }
});


// POST - saadab infot
router.post("/", async (req, res) => {
    try {
        const { diagnoseName, diagnoseID } = req.body as CreateDiagnosisParams;


        if (!diagnoseName || !diagnoseID) {
            return res
                .status(400)
                .json({ error: "Diagnoses must have id and name" });
        }


        // create new diagnoses with given parameters
        const diagnose = Diagnosis.create({
            diagnoseName: diagnoseName.trim() ?? "",
            //diagnoselID: diagnoseID ?? ""
        });

        //save article to database
        const result = await diagnose.save();

        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch diagnoses" });
    }
});

// GET - info päring (üksik diagnose)
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const diagnose = await defaultDataSource
            .getRepository(Diagnosis)
            .findOneBy({ diagnoseID: parseInt(id) });

        return res.status(200).json({ data: diagnose });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch diagnosises" });
    }
});

// PUT - update
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { diagnoseName } = req.body as UpdateDiagnosisParams;

        const diagnose = await defaultDataSource
            .getRepository(Diagnosis)
            .findOneBy({ diagnoseID: parseInt(id) });

        if (!diagnose) {
            return res.status(404).json({ error: "Diagnosis not found" });
        }


        // uuendame andmed objektis (lokaalne muudatus)
        diagnose.diagnoseName = diagnoseName ? diagnoseName : diagnose.diagnoseName;

        //salvestame muudatused andmebaasi
        const result = await diagnose.save();

        // saadame vastu uuendatud andmed (kui midagi töödeldakse serveris on seda vaja kuvada)
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not update diagnoses" });
    }
});

// DELETE - kustutamine
router.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;

        const diagnose = await defaultDataSource
            .getRepository(Diagnosis)
            .findOneBy({ diagnoseID: parseInt(id) });

        if (!diagnose) {
            return res.status(404).json({ error: "Diagnose not found" });
        }

        const result = await diagnose.remove();

        // tagastame igaks juhuks kustutatud andmed
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not update diagnoses" });
    }
});

export default router;
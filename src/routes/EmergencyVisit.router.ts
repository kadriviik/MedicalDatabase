import express from 'express';
import defaultDataSource from '../datasource';
import { EmergencyVisit } from '../entity/EmergencyVisit';


const router = express.Router();

interface CreateEmergencyVisitParams {
    id: number;
    emergencyDiagnosis: string;
}

interface UpdateEmergencyVisitParams {
    id?: number;
    emergencyDiagnosis?: string;
}

// GET - info päring (kõik em visits)
router.get("/", async (req, res) => {
    try {
        // küsi erakorralisi vastuvõtte andmebaasist
        const emergencyVisit = await defaultDataSource.getRepository(EmergencyVisit);

        // vasta erakorraliste vastuvõttude kogumikuga JSON formaadis
        return res.status(200).json({ data: emergencyVisit });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch emergency visits" });
    }
});


// POST - saadab infot
router.post("/", async (req, res) => {
    try {
        const { emergencyDiagnosis } = req.body as CreateEmergencyVisitParams;


        if (!emergencyDiagnosis) {
            return res
                .status(400)
                .json({ error: "Emergency visit must have emergency diagnosis" });
        }

        // NOTE: võib tekkida probleeme kui ID väljale kaasa anda "undefined" väärtus
        // otsime üles doctori kellele patsient kuulub

        //const doctors = await Doctor.findOneBy({id: id})

        //if(!EmergencyVisit){
        //    return res.status(400).json({ message: "Doctor with given ID not found" });
        // }

        // create new doctors with given parameters
        const emergencyVisit = EmergencyVisit.create({
            emergencyDiagnosis: emergencyDiagnosis.trim() ?? "",
        });

        //save article to database
        const result = await emergencyVisit.save();

        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch emergency visit" });
    }
});

// GET - info päring (üksik visiit)
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const emergencyVisit = await defaultDataSource
            .getRepository(EmergencyVisit)
            .findOneBy({ id: parseInt(id) });

        return res.status(200).json({ data: emergencyVisit });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch visita" });
    }
});

// PUT - update
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { emergencyDiagnosis } = req.body as UpdateEmergencyVisitParams;

        const emergencyVisit = await defaultDataSource
            .getRepository(EmergencyVisit)
            .findOneBy({ id: parseInt(id) });

        if (!emergencyVisit) {
            return res.status(404).json({ error: "Visit not found" });
        }


        // uuendame andmed objektis (lokaalne muudatus)
        emergencyVisit.emergencyDiagnosis = emergencyDiagnosis ? emergencyDiagnosis : emergencyVisit.emergencyDiagnosis;

        //salvestame muudatused andmebaasi
        const result = await emergencyVisit.save();

        // saadame vastu uuendatud andmed (kui midagi töödeldakse serveris on seda vaja kuvada)
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not update visits" });
    }
});

// DELETE - kustutamine
router.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;

        const emergencyVisit = await defaultDataSource
            .getRepository(EmergencyVisit)
            .findOneBy({ id: parseInt(id) });

        if (!emergencyVisit) {
            return res.status(404).json({ error: "Article not found" });
        }

        const result = await emergencyVisit.remove();

        // tagastame igaks juhuks kustutatud andmed
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not update visits" });
    }
});

export default router;
import express from 'express';
import defaultDataSource from '../datasource';
import { FollowUpVisit } from '../entity/FollowUpVisit';


const router = express.Router();

interface CreateFollowUpVisitParams {
    id: number;
    diagnosisStatus: string;
    insuranceID: number;
}

interface UpdateFollowUpVisitParams {
    id?: number;
    diagnosisStatus?: string;
    insuranceID?: number;
}

// GET - info päring (kõik protseduurid)
router.get("/", async (req, res) => {
    try {
        // küsi tehtud protseduure andmebaasist
        const followUpVisit = await defaultDataSource.getRepository(FollowUpVisit);

        // vasta protseduuri kogumikuga JSON formaadis
        return res.status(200).json({ data: followUpVisit });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch follow-up visits" });
    }
});


// POST - saadab infot
router.post("/", async (req, res) => {
    try {
        const { id, diagnosisStatus } = req.body as CreateFollowUpVisitParams;


        if (!id || !diagnosisStatus) {
            return res
                .status(400)
                .json({ error: "Follow-up visits must have id and name" });
        }


        // create new follow-up visits with given parameters
        const followUpVisit= FollowUpVisit.create({
            diagnosisStatus: diagnosisStatus.trim() ?? "",
        });

        //save follow up visit to database
        const result = await followUpVisit.save();

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
            .getRepository(FollowUpVisit)
            .findOneBy({ id: parseInt(id) });

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
        const { diagnosisStatus } = req.body as UpdateFollowUpVisitParams;

        const followUpVisit= await defaultDataSource
            .getRepository(FollowUpVisit)
            .findOneBy({ id: parseInt(id) });

        if (!followUpVisit) {
            return res.status(404).json({ error: "Visit not found" });
        }


        // uuendame andmed objektis (lokaalne muudatus)
        followUpVisit.diagnosisStatus = diagnosisStatus ? diagnosisStatus : followUpVisit.diagnosisStatus;

        //salvestame muudatused andmebaasi
        const result = await followUpVisit.save();

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

        const followUpVisit= await defaultDataSource
            .getRepository(FollowUpVisit)
            .findOneBy({ id: parseInt(id) });

        if (!followUpVisit) {
            return res.status(404).json({ error: "Visit not found" });
        }

        const result = await followUpVisit.remove();

        // tagastame igaks juhuks kustutatud andmed
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not update visits" });
    }
});

export default router;
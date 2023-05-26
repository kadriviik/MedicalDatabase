import express from 'express';
import defaultDataSource from '../datasource';
import { RoutineVisit } from '../entity/RoutineVisit';


const router = express.Router();

interface CreateRoutineVisitParams {
    routineVisitID: number;
    bloodPressure: string;
    weight: number;
    height: number;
    diagnosis: string;
}

interface UpdateRoutineVisitParams {
    routineVisitID?: number;
    bloodPressure?: string;
    weight?: number;
    height?: number;
    diagnosis?: string;
}

// GET - info päring (kõik routine visitid)
router.get("/", async (req, res) => {
    try {
        // küsi tehtud visiteid andmebaasist
        const routineVisit = await defaultDataSource.getRepository(RoutineVisit);

        // vasta visitite kogumikuga JSON formaadis
        return res.status(200).json({ data: routineVisit });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch office visits" });
    }
});


// POST - saadab infot
router.post("/", async (req, res) => {
    try {
        const { routineVisitID, height, weight, diagnosis, bloodPressure } = req.body as CreateRoutineVisitParams;


        if (!routineVisitID || !height || !weight || !diagnosis || !bloodPressure) {
            return res
                .status(400)
                .json({ error: "routine visits must have id and name" });
        }

        // create new routine visits with given parameters
        const routineVisit= RoutineVisit.create({
            routineVisitID: routineVisitID ?? "",
            height: height ?? "",
            weight: weight ?? "",
            diagnosis: diagnosis.trim() ?? "",
            bloodPressure: bloodPressure ?? "",
        });

        //save office visit to database
        const result = await routineVisit.save();

        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch routine visits" });
    }
});

// GET - info päring (üksik routine visit)
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const routineVisit= await defaultDataSource
            .getRepository(RoutineVisit)
            .findOneBy({ routineVisitID: parseInt(id) });

        return res.status(200).json({ data: routineVisit});
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
        const { routineVisitID, bloodPressure, weight, height, diagnosis} = req.body as UpdateRoutineVisitParams;

        const routineVisit= await defaultDataSource
            .getRepository(RoutineVisit)
            .findOneBy({ routineVisitID: parseInt(id) });

        if (!routineVisit) {
            return res.status(404).json({ error: "Visit not found" });
        }


        // uuendame andmed objektis (lokaalne muudatus)
        routineVisit.routineVisitID = routineVisitID ? routineVisitID : routineVisit.routineVisitID;
        routineVisit.bloodPressure = bloodPressure ? bloodPressure : routineVisit.bloodPressure;
        routineVisit.weight = weight ? weight : routineVisit.weight;
        routineVisit.height = height ? height : routineVisit.height;
        routineVisit.diagnosis = diagnosis ? diagnosis : routineVisit.diagnosis;


        //salvestame muudatused andmebaasi
        const result = await routineVisit.save();

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

        const routineVisit= await defaultDataSource
            .getRepository(RoutineVisit)
            .findOneBy({ weight: parseInt(id) });

        if (!routineVisit) {
            return res.status(404).json({ error: "Visit not found" });
        }

        const result = await routineVisit.remove();

        // tagastame igaks juhuks kustutatud andmed
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not update visits" });
    }
});

export default router;
import express from 'express';
import defaultDataSource from '../datasource';
import { InitialVisit } from '../entity/InitialVisit';


const router = express.Router();

interface CreateInitialVisitParams {
    id: number;
    initialDiagnosis: string;
}

interface UpdateInitialVisitParams {
    id?: number;
    initialDiagnosis?:string;
}

// GET - info päring (kõik protseduurid)
router.get("/", async (req, res) => {
    try {
        // küsi tehtud protseduure andmebaasist
        const initialVisit = await defaultDataSource.getRepository(InitialVisit);

        // vasta protseduuri kogumikuga JSON formaadis
        return res.status(200).json({ data: initialVisit });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch visits" });
    }
});


// POST - saadab infot
router.post("/", async (req, res) => {
    try {
        const { id, initialDiagnosis } = req.body as CreateInitialVisitParams;


        if (!id || !initialDiagnosis) {
            return res
                .status(400)
                .json({ error: "Initial visits must have id and name" });
        }


        // create new initial visits with given parameters
        const initialVisit= InitialVisit.create({
            initialDiagnosis: initialDiagnosis.trim() ?? "",
        });

        //save initial visit to database
        const result = await initialVisit.save();

        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch visits" });
    }
});

// GET - info päring (üksik initial visit)
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const initialVisit= await defaultDataSource
            .getRepository(InitialVisit)
            .findOneBy({ id: parseInt(id) });

        return res.status(200).json({ data: initialVisit});
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch visits" });
    }
});

// PUT - update
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { initialDiagnosis } = req.body as UpdateInitialVisitParams;

        const initialVisit= await defaultDataSource
            .getRepository(InitialVisit)
            .findOneBy({ id: parseInt(id) });

        if (!initialVisit) {
            return res.status(404).json({ error: "Visit not found" });
        }


        // uuendame andmed objektis (lokaalne muudatus)
        initialVisit.initialDiagnosis = initialDiagnosis ? initialDiagnosis : initialVisit.initialDiagnosis;

        //salvestame muudatused andmebaasi
        const result = await initialVisit.save();

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

        const initialVisit= await defaultDataSource
            .getRepository(InitialVisit)
            .findOneBy({ id: parseInt(id) });

        if (!initialVisit) {
            return res.status(404).json({ error: "Visit not found" });
        }

        const result = await initialVisit.remove();

        // tagastame igaks juhuks kustutatud andmed
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not update visits" });
    }
});

export default router;
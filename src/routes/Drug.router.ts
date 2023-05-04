import express from 'express';
import defaultDataSource from '../datasource';
import { Drug } from '../entity/Drug';


const router = express.Router();

interface CreateDrugParams {
    id: number;
    drugName: string;
    drugDescription: string;
    drugSideEffects: string;
}

interface UpdateDrugParams {
    id?: number;
    drugName?: string;
    drugDescription?: string;
    drugSideEffects?: string;
}

// GET - info päring (kõik protseduurid)
router.get("/", async (req, res) => {
    try {
        // küsi tehtud protseduure andmebaasist
        const drugs = await defaultDataSource.getRepository(Drug);

        // vasta protseduuri kogumikuga JSON formaadis
        return res.status(200).json({ data: drugs });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch drugs" });
    }
});


// POST - saadab infot
router.post("/", async (req, res) => {
    try {
        const { drugName, id, drugDescription, drugSideEffects } = req.body as CreateDrugParams;


        if (!drugName || !id || drugDescription || drugSideEffects) {
            return res
                .status(400)
                .json({ error: "Drugs must have id and name" });
        }


        // create new drugs with given parameters
        const drug= Drug.create({
            drugName: drugName.trim() ?? "",
        });

        //save drug to database
        const result = await drug.save();

        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch drugs" });
    }
});

// GET - info päring (üksik drug)
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const drug= await defaultDataSource
            .getRepository(Drug)
            .findOneBy({ id: parseInt(id) });

        return res.status(200).json({ data: drug});
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch drugs" });
    }
});

// PUT - update
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { drugName } = req.body as UpdateDrugParams;

        const drug= await defaultDataSource
            .getRepository(Drug)
            .findOneBy({ id: parseInt(id) });

        if (!drug) {
            return res.status(404).json({ error: "Drug not found" });
        }


        // uuendame andmed objektis (lokaalne muudatus)
        drug.drugName = drugName ? drugName : drug.drugName;

        //salvestame muudatused andmebaasi
        const result = await drug.save();

        // saadame vastu uuendatud andmed (kui midagi töödeldakse serveris on seda vaja kuvada)
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not update drugs" });
    }
});

// DELETE - kustutamine
router.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;

        const drug= await defaultDataSource
            .getRepository(Drug)
            .findOneBy({ id: parseInt(id) });

        if (!drug) {
            return res.status(404).json({ error: "Drug not found" });
        }

        const result = await drug.remove();

        // tagastame igaks juhuks kustutatud andmed
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not update drugs" });
    }
});

export default router;
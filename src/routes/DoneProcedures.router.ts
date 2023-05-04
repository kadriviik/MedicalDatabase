import express from 'express';
import defaultDataSource from '../datasource';
import { DoneProcedures } from '../entity/DoneProcedures';


const router = express.Router();

interface CreateDoneProceduresParams {
    procedureID: number;
    procedureName: string;
    procedurePrice: number;
}

interface UpdateDoneProceduresParams {
    procedureID?: number;
    procedureName?: string;
    procedurePrice?: number;
}

// GET - info päring (kõik protseduurid)
router.get("/", async (req, res) => {
    try {
        // küsi tehtud protseduure andmebaasist
        const procedures = await defaultDataSource.getRepository(DoneProcedures);

        // vasta protseduuri kogumikuga JSON formaadis
        return res.status(200).json({ data: procedures });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch procedures" });
    }
});


// POST - saadab infot
router.post("/", async (req, res) => {
    try {
        const { procedureName, procedureID, procedurePrice } = req.body as CreateDoneProceduresParams;


        if (!procedureName || !procedureID || procedurePrice) {
            return res
                .status(400)
                .json({ error: "Procedures must have id and name" });
        }


        // create new procedures with given parameters
        const procedure= DoneProcedures.create({
            procedureName: procedureName.trim() ?? "",
        });

        //save procedure to database
        const result = await procedure.save();

        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch procedures" });
    }
});

// GET - info päring (üksik procedure)
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const procedure= await defaultDataSource
            .getRepository(DoneProcedures)
            .findOneBy({ procedureID: parseInt(id) });

        return res.status(200).json({ data: procedure});
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch procedures" });
    }
});

// PUT - update
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { procedureName } = req.body as UpdateDoneProceduresParams;

        const procedure= await defaultDataSource
            .getRepository(DoneProcedures)
            .findOneBy({ procedureID: parseInt(id) });

        if (!procedure) {
            return res.status(404).json({ error: "Procedures not found" });
        }


        // uuendame andmed objektis (lokaalne muudatus)
        procedure.procedureName = procedureName ? procedureName : procedure.procedureName;

        //salvestame muudatused andmebaasi
        const result = await procedure.save();

        // saadame vastu uuendatud andmed (kui midagi töödeldakse serveris on seda vaja kuvada)
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not update procedurees" });
    }
});

// DELETE - kustutamine
router.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;

        const procedure= await defaultDataSource
            .getRepository(DoneProcedures)
            .findOneBy({ procedureID: parseInt(id) });

        if (!procedure) {
            return res.status(404).json({ error: "Procedure not found" });
        }

        const result = await procedure.remove();

        // tagastame igaks juhuks kustutatud andmed
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not update procedurees" });
    }
});

export default router;
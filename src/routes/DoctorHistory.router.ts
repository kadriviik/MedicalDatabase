import express from 'express';
import defaultDataSource from '../datasource';
import { DoctorHistory } from '../entity/DoctorHistory';


const router = express.Router();

interface CreateDoctorHistoryParams {
    ID: number;
    startDate: Date;
    endDate: Date;
    reasonForLeaving: string;
}

interface UpdateDoctorHistoryParams {
    ID?: number;
    startDate?: Date;
    endDate?: Date;
    reasonForLeaving?: string;
}

// GET - info päring (kõik arstide ajalood)
router.get("/", async (req, res) => {
    try {
        // küsi arstide ajalugu andmebaasist
        const doctorHistory = await defaultDataSource.getRepository(DoctorHistory);

        // vasta doctorite kogumikuga JSON formaadis
        return res.status(200).json({ data: doctorHistory });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch doctor history" });
    }
});


// POST - saadab infot
router.post("/", async (req, res) => {
    try {
        const { startDate, endDate, reasonForLeaving} = req.body as CreateDoctorHistoryParams;


        if (!startDate || !endDate || !reasonForLeaving) {
            return res
                .status(400)
                .json({ error: "Doctors history must have start date, end date and reason for leaving" });
        }

        // NOTE: võib tekkida probleeme kui ID väljale kaasa anda "undefined" väärtus
        // otsime üles doctori kellele patsient kuulub

        //const doctors = await Doctor.findOneBy({id: id})

        //if(!Doctor){
        //    return res.status(400).json({ message: "Doctor with given ID not found" });
       // }

        // create new doctors with given parameters
        const doctorHistory = DoctorHistory.create({
            startDate: startDate ?? "",
            endDate: endDate ?? "",
            reasonForLeaving: reasonForLeaving ?? "",
        });

        //save article to database
        const result = await doctorHistory.save();

        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch doctor history" });
    }
});

// GET - info päring (üksik doctor)
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const doctorHistory = await defaultDataSource
            .getRepository(DoctorHistory)
            .findOneBy({ ID: parseInt(id) });

        return res.status(200).json({ data: doctorHistory });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch doctor history" });
    }
});

// PUT - update
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { startDate, endDate, reasonForLeaving} = req.body as UpdateDoctorHistoryParams;

        const doctorHistory = await defaultDataSource
            .getRepository(DoctorHistory)
            .findOneBy({ ID: parseInt(id) });

        if (!doctorHistory) {
            return res.status(404).json({ error: "Doctor history not found" });
        }


        // uuendame andmed objektis (lokaalne muudatus)
        doctorHistory.startDate = startDate ? startDate : doctorHistory.startDate;
        doctorHistory.endDate = endDate ? endDate : doctorHistory.endDate;
        doctorHistory.reasonForLeaving = reasonForLeaving ? reasonForLeaving : doctorHistory.reasonForLeaving;

        //salvestame muudatused andmebaasi
        const result = await doctorHistory.save();

        // saadame vastu uuendatud andmed (kui midagi töödeldakse serveris on seda vaja kuvada)
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not update doctor history" });
    }
});

// DELETE - kustutamine
router.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;

        const doctorHistory = await defaultDataSource
            .getRepository(DoctorHistory)
            .findOneBy({ ID: parseInt(id) });

        if (!doctorHistory) {
            return res.status(404).json({ error: "History not found" });
        }

        const result = await doctorHistory.remove();

        // tagastame igaks juhuks kustutatud andmed
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not update doctors history" });
    }
});

export default router;

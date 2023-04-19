import express from 'express';
import defaultDataSource from '../datasource';
import { Doctor } from '../entity/Doctor';


const router = express.Router();

interface CreateDoctorParams {
    ID: number;
    doctorName: string;
    hospitalID: number;
    phoneNumber: number;
    email: string;
    specialization: string;
}

interface UpdateDoctorParams {
    ID?: number;
    doctorName?: string;
    hospitalID?: number;
    phoneNumber?: number;
    email?: string;
    specialization?: string;
}

// GET - info päring (kõik doctorid)
router.get("/", async (req, res) => {
    try {
        // küsi doctoreid andmebaasist
        const doctors = await defaultDataSource.getRepository(Doctor);

        // vasta doctorite kogumikuga JSON formaadis
        return res.status(200).json({ data: doctors });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch doctors" });
    }
});


// POST - saadab infot
router.post("/", async (req, res) => {
    try {
        const { doctorName, hospitalID, email, phoneNumber, specialization } = req.body as CreateDoctorParams;


        if (!doctorName || !hospitalID || email || phoneNumber) {
            return res
                .status(400)
                .json({ error: "Doctors must have name, hospital id, email and phonenumber" });
        }

        // NOTE: võib tekkida probleeme kui ID väljale kaasa anda "undefined" väärtus
        // otsime üles doctori kellele patsient kuulub

        //const doctors = await Doctor.findOneBy({id: id})

        //if(!Doctor){
        //    return res.status(400).json({ message: "Doctor with given ID not found" });
       // }

        // create new doctors with given parameters
        const doctor = Doctor.create({
            doctorName: doctorName.trim() ?? "",
            // hospitalID: hospitalID ?? "",
            phoneNumber: phoneNumber ?? "",
            email: email.trim() ?? "",
            specialization: specialization.trim() ?? "",
        });

        //save article to database
        const result = await doctor.save();

        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch doctors" });
    }
});

// GET - info päring (üksik doctor)
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const doctor = await defaultDataSource
            .getRepository(Doctor)
            .findOneBy({ ID: parseInt(id) });

        return res.status(200).json({ data: doctor });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch doctors" });
    }
});

// PUT - update
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { doctorName, email, phoneNumber, specialization } = req.body as UpdateDoctorParams;

        const doctor = await defaultDataSource
            .getRepository(Doctor)
            .findOneBy({ ID: parseInt(id) });

        if (!doctor) {
            return res.status(404).json({ error: "Doctor not found" });
        }


        // uuendame andmed objektis (lokaalne muudatus)
        doctor.doctorName = doctorName ? doctorName : doctor.doctorName;
        // doctor.hospitalID = hospitalID ? hospitalID : doctor.hospitalID;
        doctor.phoneNumber = phoneNumber ? phoneNumber : doctor.phoneNumber;
        doctor.email = email ? email : doctor.email;
        doctor.specialization = specialization ? specialization : doctor.specialization;


        //salvestame muudatused andmebaasi
        const result = await doctor.save();

        // saadame vastu uuendatud andmed (kui midagi töödeldakse serveris on seda vaja kuvada)
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not update articles" });
    }
});

// DELETE - kustutamine
router.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;

        const doctor = await defaultDataSource
            .getRepository(Doctor)
            .findOneBy({ ID: parseInt(id) });

        if (!doctor) {
            return res.status(404).json({ error: "Article not found" });
        }

        const result = await doctor.remove();

        // tagastame igaks juhuks kustutatud andmed
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not update doctors" });
    }
});

export default router;
import express from 'express';
import defaultDataSource from '../datasource';
import { Patient } from '../entity/Patient';

const router = express.Router();

interface CreatePatientParams {
    ID: number;
    insuranceID: number;
    holderID: number;
    name: string;
    address: string;
    phone: number;
    email: string;
    doctorID: number;
    insuranceCompanyID: number;

}

interface UpdatePatientParams {
    ID?: number;
    insuranceID?: number;
    holderID?: number;
    name?: string;
    address?: string;
    phone?: number;
    email?: string;
    doctorID?: number;
    insuranceCompanyID?: number;
}

// GET - info päring (kõik patsiendid)
router.get("/", async (req, res) => {
    try {
        // küsi patsiendid andmebaasist
        const patient = await defaultDataSource.getRepository(Patient).find();

        // vasta patsientide kogumikuga JSON formaadis
        return res.status(200).json({ data: patient });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch Patients" });
    }
});


// POST - saadab infot
router.post("/", async (req, res) => {
    try {
        const { insuranceID, holderID, name, address, phone, email, doctorID, insuranceCompanyID } = req.body as CreatePatientParams;

        // TODO: validate & santize
        if (!name || !insuranceID || !holderID || !address || !phone || !email || !doctorID || !insuranceID || !insuranceCompanyID) {
            return res
                .status(400)
                .json({ error: "Patient has to have name, phone number and insurance number" });
        }


        // create new Patient with given parameters
        const patient = Patient.create({
            name: name.trim() ?? "",
            insuranceID: insuranceID ?? "",
            holderID: holderID ?? "",
            address: address.trim() ?? "",
            phone: phone ?? "",
            email: email.trim() ?? "",
            doctorID: doctorID ?? "",
            insuranceCompanyID: insuranceCompanyID ?? "",




            // author: author,
        });

        //save Author to database
        const result = await patient.save();

        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch Patients" });
    }
});

// GET - info päring (üksik patsient)
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // tavaline ORM päring koos "relation" entity sisuga
        const patient = await defaultDataSource
            .getRepository(Patient)
            .findOne({ where:{ID: parseInt(id)}, relations: ['Patient'] });

        return res.status(200).json({ data: patient });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not fetch Patients" });
    }
});

// PUT - update
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const {  ID, insuranceID, holderID, name, address, phone, email, doctorID, insuranceCompanyID  } = req.body as UpdatePatientParams;

        const patient = await defaultDataSource
            .getRepository(Patient)
            .findOneBy({ ID: parseInt(id) });

        if (!patient) {
            return res.status(404).json({ error: "Patient not found" });
        }

        // uuendame andmed objektis (lokaalne muudatus)

        patient.name = name ? name : patient.name;
        patient.insuranceID = insuranceID ? insuranceID : patient.insuranceID;
        patient.holderID = holderID ? holderID : patient.holderID;
        patient.address = address ? address : patient.address;
        patient.phone = phone ? phone : patient.phone;
        patient.email = email ? email : patient.email;
        patient.doctorID = doctorID ? doctorID : patient.doctorID;
        patient.insuranceCompanyID = insuranceCompanyID ? insuranceCompanyID : patient.insuranceCompanyID;



        //salvestame muudatused andmebaasi
        const result = await patient.save();

        // saadame vastu uuendatud andmed (kui midagi töödeldakse serveris on seda vaja kuvada)
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not update Patients" });
    }
});

// DELETE - kustutamine
router.delete("/:id", async(req, res) => {
    try {
        const { id } = req.params;

        const patient = await defaultDataSource
            .getRepository(Patient)
            .findOneBy({ ID: parseInt(id) });


        if (!patient) {
            return res.status(404).json({ error: "Patient not found" });
        }

        const result = await patient.remove();

        // tagastame igaks juhuks kustutatud andmed
        return res.status(200).json({ data: result });
    } catch (error) {
        console.log("ERROR", { message: error });

        // vasta süsteemi veaga kui andmebaasipäringu jooksul ootamatu viga tekib
        return res.status(500).json({ message: "Could not update Patients" });
    }
});

export default router;
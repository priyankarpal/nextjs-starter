import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { Permit } from 'permitio';

dotenv.config();

const TENANT=process.env.TENANT_ID;
const apikey=process.env.ENV;

const permit=new Permit({
    pdp: "https://cloudpdp.api.permit.io",
    token: apikey,
});

const app=express();
const port=5000;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.post("/api/request-access", async (req, res) => {
    try {
        const { email }=req.body;
        const result=await permit.elements.loginAs({
            userId: email,
            tenantId: TENANT,
        });

        if (result.token) {
            return res.status(302).redirect(result.redirect_url);
        }
        return res.status(403).json({ message: result.error });
    } catch (error) {
        return res.status(500).json({ error: "Failed to request access" });
    }
});

app.listen(port, () => {
    console.log(`Server port ${port}`);
});

import { Application, Request, Response } from "express";
import express from 'express';
import cors from 'cors'
import authRoute from "./app/routes/authRoute";
import collegeRoute from "./app/routes/collegeRoute";
import admissionRoute from "./app/routes/admissionRoute";
import reviewRoute from "./app/routes/reviewRoute";

// 61V6v30J996HuRCG
// 

const app:Application = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoute);
app.use('/api/colleges', collegeRoute);
app.use('/api/admissions', admissionRoute);
app.use('/api/reviews', reviewRoute);




app.get("/healthz", (req:Request,res:Response) => {
    res.send("ok");
  });
  
app.get('/',async(req:Request,res:Response)=>{
    res.send(`welcome to college admission portal server`)
})






export default app



// Error handling middleware
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  });
  
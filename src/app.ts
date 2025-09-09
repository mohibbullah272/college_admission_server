import { Application, Request, Response } from "express";
import express from 'express';
import cors from 'cors'

// 61V6v30J996HuRCG
// 

const app:Application = express()

app.use(cors())
app.use(express.json())



app.get("/healthz", (req:Request,res:Response) => {
    res.send("ok");
  });
  
app.get('/',async(req:Request,res:Response)=>{
    res.send(`welcome to college admission portal server`)
})






export default app




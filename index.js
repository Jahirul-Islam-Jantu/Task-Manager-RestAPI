import express from 'express';
import router from './src/route/api.js';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import {
    Max_JSON_Size,
    MongoDB_Connection,
    PORT,
    Request_Limit_Number,
    Request_Limit_Time,
    URL_Encoding
} from "./src/config/config.js";

// server creates with express
const app = express();

// global middleware
app.use(cors());
app.use(helmet());
app.use(express.json({limit:Max_JSON_Size}));
app.use(express.json({extended:URL_Encoding}))
app.use(hpp());
app.use(helmet());


// rate limiter
const limiter = rateLimit({windowMs:Request_Limit_Time, max: Request_Limit_Number})
app.use(limiter)

mongoose.connect(MongoDB_Connection, { user: "", pass: "",autoIndex: true}).then(()=>{
    console.log("connected to MongoDB")
}).catch(err=>{
    console.log(err)
})
// routes
app.use("/api", router)

app.listen(PORT || 3333, ()=>{
    console.log("Server is running on port: 2020");
})

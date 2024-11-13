import mongoose from "mongoose";
import express from "express";
const router = express.Router();
import fileUpload from "express-fileupload";
import path from "node:path";
import fs from "fs";
import cors from "cors";

if (!fs.existsSync(path.join(process.cwd(), "storage"))) {
    fs.mkdirSync(path.join(process.cwd(), "storage"));
}

const app = express()
app.use(express.json())
app.use(cors());


// Serve static files from the "storage" folder at the "/get-file" path
app.use("/get-file", express.static(path.join(process.cwd(), "storage")));

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles: true,
    createParentPath: true
}));





// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/TaskManager", { autoIndex:true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Failed to connect to MongoDB:", err));

// Define a schema
const practiceSchema = mongoose.Schema({
    email: String,
    name: String,
    age: Number,
    hobby: String,
});

// Create a model based on the schema
const Practice = mongoose.model("Practice", practiceSchema);

const AuthMiddleWare = (req, res, next) => {
    let email = req.body.email || req.params.email;
    if (!email) { // Check if getting email failed
        res.status(401).json({ error: "Invalid email" });
    } else {
        req.email = email; // directly assign email
        next();
    }
}


// express file upload
const FileUpload = async (req, res) => {
    // Check if files were uploaded
    if (!req.files || !req.files['file']) {
        return res.status(400).send({ "Upload Error": "No file uploaded" });
    }

    // Catch the file
    const files = Array.isArray(req.files['file']) ? req.files['file'] : [req.files['file']];
    const uploadedPaths = [];
    for (let file of files) {
        let myFileName = `${Math.random() * 1000}_${file.name}`;
        let myFilePath = path.resolve(process.cwd(), "storage", myFileName);

        try {
            await file.mv(myFilePath);
            uploadedPaths.push({ fileName: file.name, filePath: myFilePath });
        } catch (err) {
            return res.status(500).json({ "Upload Error": err });
        }
    }
    res.status(200).json({ "Uploaded Files": uploadedPaths });
};


// Example usage: inserting a document
const ControllerCreate = async (req, res) => {
    try{
        let reqBody = req.body;
        await Practice.create(reqBody);
        res.json({status:"success", data: reqBody});
    }catch(err){
        res.json({status: "error", error: err});
    }
}
const ControllerUpdate = async (req, res) => {
    try{
        let email = req.email
        let reqBody = req.body;
        const result = await Practice.updateOne({email: email}, reqBody)
        if (result.matchedCount === 0){
            res.status(404).json({ status: "error", message: "User not found" });
        }else{
            res.json({ status: "success", message: "User updated successfully" });
        }
    }catch(err){
        res.json({status: "error", error: err});
    }

}

// route
router.post("/create", ControllerCreate)
router.post("/update", AuthMiddleWare, ControllerUpdate)
router.post("/file", FileUpload)
app.use("/api", router)

app.listen(3000, () => {
    console.log("Server started on port 3000");
})

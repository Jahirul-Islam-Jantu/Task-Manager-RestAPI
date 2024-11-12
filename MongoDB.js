import mongoose from "mongoose";
import express from "express";
const router = express.Router();

const app = express()
app.use(express.json())


// Connect to MongoDB
mongoose.connect("mongodb+srv://jahirul:jan742682@mernstack.tose2.mongodb.net/", { autoIndex:true })
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
app.use("/api", router)

app.listen(3000, () => {
    console.log("Server started on port 3000");
})

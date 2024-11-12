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



// Example usage: inserting a document
const Controller = async (req, res) => {
    try{
        let reqBody = req.body;
        await Practice.create(reqBody);
        res.json({status:"success", data: reqBody});
    }catch(err){
        res.json({status: "error", error: err});
    }
}

// route
router.post("/create", Controller)
app.use("/api", router)

app.listen(3000, () => {
    console.log("Server started on port 3000");
})

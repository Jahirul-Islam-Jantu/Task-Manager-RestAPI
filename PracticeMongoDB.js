import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
const router = express.Router();


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);



// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/TaskManager", { autoIndex:true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Failed to connect to MongoDB:", err));


// MongoDB Schema and data model creating
const InsertData = mongoose.Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    name: {type: String, required: true},
    age: {type: Number, required: true},
    address: {type: String, required: true},
}, {versionKey: false, timestamps: true});

const DataModel = mongoose.model("mongoPractice", InsertData);


// Product Schema

const ProductDetails = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
}, {versionKey: false, timestamps: true});

const ProductModel = mongoose.model("products", ProductDetails);



// Data Controller for server request create
const Registration = async (req, res) => {
    try{
        let reqBody = req.body;
        let result =  await DataModel.create(reqBody);
        if (!result){
            res.status(404).send({message:"Registration failed"});
        }else {
            res.json({status:"success", data: result});
        }
    }
    catch(err){
        res.status(400).json({status: "error", error: err});
    }
}
// Data Controller for server request read

const ReadUser = async (req, res) => {
    try{
        let user = await DataModel.find()
        res.status(200).json({status: "success", data: user});
    }
    catch(err){
        res.status(400).json({status: "error", error: err});
    }
}

// read single user












// Product Controller for create
const CreateProduct = async (req, res) => {
    try{
        let reqBody = req.body;
        let result =  await ProductModel.create(reqBody);
        if (!result){
            res.status(404).send({message:"Product not found"});
        }else{
            res.json({status:"success", data: result});
        }
    }catch(err){
        res.status(400).json({status: "error", error: err});
    }
}

// Product Controller for read

const ReadProducts = async (req, res) => {
    try{
        let result = await ProductModel.find()
        res.status(200).json({status: "success", data: result});
    }catch(err){
        res.status(400).json({status: "error", error: err});
    }
}





// making routes
// Users
router.post("/register", Registration);
router.get("/readUser", ReadUser)

// Products
router.post("/createProduct", CreateProduct);
router.get("/readProducts", ReadProducts);


app.listen(5522, () => console.log("Listening on port 5522"));
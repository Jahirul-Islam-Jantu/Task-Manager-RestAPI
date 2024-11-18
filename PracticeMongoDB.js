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



// Middleware
const AuthMiddlewareForUser = (req, res, next) => {
    try{
        let email = req.body.email || req.email || req.params.email || req.headers['email']
        let id = req.params._id || req._id || req.headers['_id'] || req.body._id;
        if (!email || !id) {
            res.status(403).send("Email or ID is required");
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(403).send("Invalid id!");
        }
        req.email = email
        req._id = id
        next()
    }catch(err){
        res.status(401).send("Authorization failed with this email or password");
    }
}

const AuthMiddlewareForProduct = (req, res, next) => {
    try{
        let id = req.params.id || req.id || req.headers['id'] || req.body.id;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            res.status(403).send("Invalid id!");
        }else{
            next()
        }
    }catch(err){
        res.status(403).send("Authorization failed with this Product ID");
    }
}


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
const ReadSingleUser = async (req, res) => {
    try{
        let email = req.email;
        let id = req._id
        let result = await DataModel.findOne({email: email, _id: id})
        if(!result){
            res.status(404).send({message:"result for user not found"});
        }else{
            res.status(200).json({status: "success", data: result});
        }
    }catch(err){
        res.status(400).json({status: "error", error: err});
    }
}
// update single user

const UpdateUser = async (req, res) => {
    try{
        let id = req.params.id
        let reqBody = req.body;
        let result = await DataModel.updateOne({_id: id}, reqBody)
        if (!result){
            res.status(404).send({message:"ID for user not found"});
        }else{
            res.status(200).json({status: "success", data: result});
        }
    }catch(err){
        res.status(400).json({status: "error", error: err});
    }
}

const DeleteUser = async (req, res) => {
    try{
        let id = req.params.id
        await DataModel.deleteOne({_id: id})
        res.status(200).json({status: "success", message: "successfully deleted"});
    }
    catch(err){
        res.status(400).json({status: "error", error: err});
    }
}











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

// read single item

const SingleProduct = async (req, res) => {
    try{
        let id = req.params.id
        let result = await ProductModel.findById(id);
        if(!result){
            res.status(404).send({message:"Product not found"});
        }else{
            res.status(200).json({status: "success", data: result});
        }

    }catch (err){
        res.status(400).json({status: "error", error: err});
    }
}

// update single product by id
const UpdateProduct = async (req, res) => {
    try{
        let id = req.params.id
        let reqBody = req.body;
        let result =  await ProductModel.updateOne({_id: id}, reqBody);
        if (!result){
            res.status(404).send({message:"Product not found"});
        }else{
            res.status(200).json({status: "success", data: result});
        }
    }catch(err){
        res.status(400).json({status: "error", error: err});
    }
}





// making routes

// Users
router.post("/register", Registration);
router.get("/readUser", ReadUser)
router.get("/singleUser/:email",AuthMiddlewareForUser, ReadSingleUser)
router.post("/updateUser/:id",  UpdateUser)
router.delete("/deleteUser/:id", DeleteUser)

// Products
router.post("/createProduct", CreateProduct);
router.get("/readProducts", ReadProducts);
router.get("/readProduct/:id",AuthMiddlewareForProduct, SingleProduct);
router.post("/updateProduct/:id",  UpdateProduct);
router.get("/deleteProduct/:id", DeleteProduct)


app.listen(5522, () => console.log("Listening on port 5522"));
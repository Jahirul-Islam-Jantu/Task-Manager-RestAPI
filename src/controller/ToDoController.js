import TodoModel from "../model/TodoListModel.js";
import UserModel from "../model/UsersModel.js";

export const CreateTodo =async (req, res) => {
    try{
        let reqBody = req.body;
        let TodoSubject = reqBody['TodoSubject']
        let TodoDescription = reqBody['TodoDescription']
        let email = req.headers['email']
        let TodoStatus = "New"
        let TodoCreateDate = Date.now()
        let PostBody = {
            email: email,
            TodoSubject: TodoSubject,
            TodoDescription: TodoDescription,
            TodoStatus: TodoStatus,
            TodoDate: TodoCreateDate,
        }
        let todo = await TodoModel.create(PostBody);
        if (todo){
            res.status(200).json({todo: todo});
        }else{
            res.status(404).send({message:"Todo Creating failed"});
        }
    }catch(err){
        res.status(400).json({status:"fail", message:"Error creating new todo"});
    }
}

export const ReadTodos = async (req, res) => {
    try{
        let email= req.headers['email']
        const result = await TodoModel.find({email})
        res.status(200).json({status: "success", message: result});
    }catch(err){
        res.status(400).json({status: "error", error: err});
    }
}
export const UpdateTodo = async (req, res) => {
    try{
        let email= req.headers['email']
        let reqBody = req.body;
        const updateBody = await TodoModel.updateOne({email}, reqBody)
        if (!updateBody){
            res.status(404).send({message:"Todo not found"});
        }else{
            res.status(200).json({status: "success", data: updateBody});
        }
    }catch(err){
        res.status(400).json({status: "error", error: err});
    }
}

export const DeleteTodo = async (req, res) => {
    try{
        let email= req.headers['email']
        await TodoModel.deleteOne({email})
        res.status(200).json({status: "success"});
    }catch(err){
        res.status(400).json({status: "error", error: err});
    }
}
export const findSingleUser = async (req, res) => {
    try{
        let email= req.headers['email']
        let user = await UserModel.findOne({email})
        if(user){
            res.status(200).json({status: "success", data: user});
        }else{
            res.status(404).send({message:"User not found"});
        }
    }catch(err){
        res.status(400).json({status:"error", error: err});
    }
}
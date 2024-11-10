import TaskModel from "../model/TasksModel.js";

export const create = async (req, res) => {
    try{
        let email = req.headers['email']
        let reqBody = req.body;
        reqBody.email = email;
        await TaskModel.create( reqBody)
        res.json({status: "success", message: "Task successfully"});
    }catch(err){
        res.json({status: "error", error: err});
    }
}

export const update = async (req, res) => {
    try{
        let email = req.headers['email']
        let {_id} = req.params;
        let reqBody = req.body;
        await TaskModel.updateOne({email: email, id:_id}, reqBody)
        res.json({status: "success", message: "Task successfully"});
    }catch(err){
        res.json({status: "error", error: err});
    }
}

export const read = async (req, res) => {
    try{
        let email = req.headers['email']
        let {_id} = req.params;
        let reqBody = req.body;
        await TaskModel.updateOne({email: email, id:_id}, reqBody)
        res.json({status: "success", message: "Task successfully"});
    }catch(err){
        res.json({status: "error", error: err});
    }
}

export const deleteItem = async (req, res) => {
    try{
        let email = req.headers['email']
        let {_id} = req.params;
        let reqBody = req.body;
        await TaskModel.updateOne({email: email, id:_id}, reqBody)
        res.json({status: "success", message: "Task successfully"});
    }catch(err){
        res.json({status: "error", error: err});
    }
}
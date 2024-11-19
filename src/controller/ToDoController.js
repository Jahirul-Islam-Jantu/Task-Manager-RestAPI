import TodoModel from "../model/TodoListModel.js";

export const CreateTodo =async (req, res) => {
    try{
        let reqBody = req.body;
        let todo = await TodoModel.create(reqBody);
        if (todo){
            res.status(200).json({todo: todo});
        }else{
            res.status(404).send({message:"Todo Creating failed"});
        }
    }catch(err){
        res.status(400).json({status:"fail", message:"Error creating new todo"});
    }
}
import TodoModel from "../model/TodoListModel.js";

export const CreateTodo =async (req, res) => {
    try{
        let reqBody = req.body;
        let TodoSubject = reqBody['TodoSubject']
        let TodoDescription = reqBody['TodoDescription']
        let userName = req.headers['username']
        let TodoStatus = "New"
        let TodoCreateDate = Date.now()
        let PostBody = {
            Username: userName,
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
        const result = await TodoModel.find()
        res.status(200).json({status: "success", message: result});
    }catch(err){
        res.status(400).json({status: "error", error: err});
    }
}
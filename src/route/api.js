import express from 'express';
const router = express.Router();
import * as userController from '../controller/UsersController.js';
import * as TasksController from '../controller/TasksController.js';
import * as TodoController from "../controller/ToDoController.js"
import {AuthMiddleware} from "../middleware/AuthMiddleware.js";
import {PermuteController} from "../controller/PermuteController.js"


router.post("/registration", userController.registration);
router.post("/login", userController.login);

router.get("/profileDetails", AuthMiddleware, userController.profileDetails);
router.post("/profileUpdate",AuthMiddleware, userController.profileUpdate);

router.get("/verifyEmail/:email", userController.verifyEmail);
router.get("/verifyOTP/:email/:otp", userController.verifyOTP);
router.get("/passwordReset/:email/:otp/:password", userController.passwordReset);


// Task create, update, read, delete
router.post("/task/create", AuthMiddleware ,  TasksController.create);
router.post("/task/update/:id", AuthMiddleware , TasksController.update);
router.get("/task/read",AuthMiddleware , TasksController.read);
router.get("/task/delete/:id", AuthMiddleware ,TasksController.deleteItem);


//Permutation
router.get("/permutation/:str", PermuteController)

//Todo app routes
router.post("/createtodo",AuthMiddleware, TodoController.CreateTodo)
router.get("/readTodo",AuthMiddleware, TodoController.ReadTodos)
router.post("/updateTodo", AuthMiddleware, TodoController.UpdateTodo);
router.delete("/deleteTodo", AuthMiddleware, TodoController.DeleteTodo);





export default router;
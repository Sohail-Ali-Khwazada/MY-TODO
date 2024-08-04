import express from "express";
import { todos } from "../models/todos.models.js";

const router = express.Router();

router.post("/", async(req,res) => {
  const {task,isCompleted} = req.body;
  try {
    if(!task) {
      res.status(400).send({
        message: "Send all required fields"
      });
    }
    const newtodo = {
      task,
      isCompleted
    };
    const todo = await todos.create(newtodo);
    res.status(201).send(todo);
  } catch(err) {
    console.log(err.message);
    res.status(500).send({message: err.message});
  }
})

router.get("/", async(req,res) => {

  try {
    const alltodos = await todos.find();
    res.status(200).json(alltodos);
  } catch(err) {
    console.log(err.message);
    res.status(500).send({message: err.message});
  }
})

router.delete("/:id",async(req,res) => {
  try{
    const {id} = req.params;
    const result = await todos.findByIdAndDelete(id);
 
    if(!result) res.status(404).json({message: "todo not found"});
    res.status(200).send({message: "todo deleted successfully"});

  } catch(err) {
    console.log(err.message);
    res.status(500).send({message: err.message});
  }
})

router.put("/:id", async(req,res) => {
  try {
    if(!req.body.task) {
      res.status(400).send({
        message: "Send all required fields"
      });
    }
    const {id} = req.params;
    const result = await todos.findByIdAndUpdate(id,req.body);

    if(!result) res.status(404).json({message: "todo not found"});
    res.status(200).send({message: "todo updated successfully"});
  } catch (error) {
    console.log(error.message);
    res.status(500).send({message: error.message});
  }
})

export default router;
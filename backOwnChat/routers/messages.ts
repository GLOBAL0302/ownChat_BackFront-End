import express from "express";
import fileDB from '../fileDb';
import { IMessageMutation } from '../types';



const messagesRouter = express.Router();

messagesRouter.get("/", async (req, res) => {
  const messages = await fileDB.getMessages();
  res.send(messages)
});

messagesRouter.post("/", async (req, res) => {
  if(!req.body.author || !req.body.message){
    return res.status(400).send({error: "message and author are required"});
  }
  const message:IMessageMutation = {
    message: req.body.message,
    author: req.body.author
  }

  const savedProduct = await fileDB.addMessage(message);
  return res.send(savedProduct);
})


export default messagesRouter;
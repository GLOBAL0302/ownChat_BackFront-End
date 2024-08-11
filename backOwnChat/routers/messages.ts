import express from "express";
import fileDB from '../fileDb';
import { IMessageMutation } from '../types';



const messagesRouter = express.Router();



messagesRouter.get("/", async (req, res) => {
  const messages = await fileDB.getMessages();
  const queryDate = req.query.datetime as string;
  const date = new Date(queryDate);
  if(isNaN(date.getDate())){
    return res.status(400).send({error: "The date is not Correct"})
  }
  const sortByValue = messages.filter((item) => {
    return (
      new Date(queryDate).getTime() < new Date(item.createAt).getTime()
      ||
      new Date(queryDate).getTime() === new Date(item.createAt).getTime()
    );
  });

  res.send(sortByValue.slice(0, 30));
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
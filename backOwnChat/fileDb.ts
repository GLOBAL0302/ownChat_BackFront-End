import {promises as fs} from "fs";
import {randomUUID} from "crypto";
import { IMessageMutation, IMessagesDB } from './types';


const fileName = "./db.json";
let data:IMessagesDB[]  = [];

const fileDB ={
  async init(){
    try{
      const fileContents = await fs.readFile(fileName);
      data = JSON.parse(fileContents.toString());
    }catch(e){
      data = []
    }
  },
  async getMessages(){
    return data;
  },
  async addMessage(item:IMessageMutation){
    const id = randomUUID();
    const createAt = new Date().toISOString();
    const newMessage:IMessagesDB = {
      ...item,
      id,
      createAt,
    }
    data.push(newMessage);
    await this.save();
    return newMessage;
  },
  async save(){
    await fs.writeFile(fileName, JSON.stringify(data, null, 2));
  }
}

export default fileDB;
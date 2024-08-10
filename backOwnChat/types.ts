export interface IMessagesDB{
  id:string
  createAt:string,
  author:string,
  message:string
}

export interface IMessageMutation{
  author:string,
  message:string
}
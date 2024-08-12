export interface messageMutation {
  author: string;
  message: string;
}

export interface IMessagesDB {
  id: string;
  createAt: string;
  author: string;
  message: string;
}

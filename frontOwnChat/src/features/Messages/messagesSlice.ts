import { IMessagesDB } from '../../types';
import { createSlice } from '@reduxjs/toolkit';

export interface IMessagesSliceState{
  messagesState:IMessagesDB[]
  loadingAllMessages:boolean
}

const initialState: IMessagesSliceState= {
  messagesState: [],
  loadingAllMessages:false,
}

const messagesSlice = createSlice({
  name:"messages",
  initialState,
  reducers:{

  },
  extraReducers:(builder)=>{

  },
  selectors:{
    selectAllMessages:(state)=> state.messagesState,
    selectAllMessagesLoading:(state)=> state.loadingAllMessages
  }
})


export const messageReducer = messagesSlice.reducer;
export const {selectAllMessages, selectAllMessagesLoading} = messagesSlice.selectors;
import { IMessagesDB } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { getAllMessages } from './messagesThunk';

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
    builder
      .addCase(getAllMessages.pending, (state)=>{
      state.loadingAllMessages = true
    })
      .addCase(getAllMessages.fulfilled, (state, {payload:messages})=>{
        state.messagesState = messages;
      })
      .addCase(getAllMessages.rejected, (state)=>{
        state.loadingAllMessages = false
      })
  },
  selectors:{
    selectAllMessages:(state)=> state.messagesState,
    selectAllMessagesLoading:(state)=> state.loadingAllMessages
  }
})


export const messageReducer = messagesSlice.reducer;
export const {} = messagesSlice.actions;
export const {selectAllMessages, selectAllMessagesLoading} = messagesSlice.selectors;
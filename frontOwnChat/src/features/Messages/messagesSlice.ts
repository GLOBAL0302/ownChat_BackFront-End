import { IMessagesDB } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { getAllMessages, postNewMessage } from './messagesThunk';

export interface IMessagesSliceState{
  messagesState:IMessagesDB[]
  loadingAllMessages:boolean
  postingMessagesLoading:boolean
}

const initialState: IMessagesSliceState= {
  messagesState: [],
  loadingAllMessages:false,
  postingMessagesLoading:false
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

    builder
      .addCase(postNewMessage.pending, (state)=>{
        state.postingMessagesLoading = true
      })
      .addCase(postNewMessage.fulfilled, (state)=>{
        state.postingMessagesLoading = false
      })
      .addCase(postNewMessage.rejected, (state)=>{
        state.postingMessagesLoading = false
      })
  },
  selectors:{
    selectAllMessages:(state)=> state.messagesState,
    selectAllMessagesLoading:(state)=> state.loadingAllMessages,
    selectPostMessageLoading:(state)=> state.postingMessagesLoading
  }
})


export const messageReducer = messagesSlice.reducer;
export const {} = messagesSlice.actions;
export const {selectAllMessages, selectAllMessagesLoading, selectPostMessageLoading} = messagesSlice.selectors;
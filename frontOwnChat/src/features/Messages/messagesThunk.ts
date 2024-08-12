import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { IMessagesDB, messageMutation } from '../../types';
import { RootState } from '../../app/store';

export const getAllMessages = createAsyncThunk<IMessagesDB[], string>(
  'getAllMessages',
  async (dateTime) => {
    const { data } = await axiosApi.get(`/messages?datetime=${dateTime}`);
    return data;
  },
);

export const postNewMessage = createAsyncThunk<
  void,
  messageMutation,
  { state: RootState }
>('PostNewMessage', async (newMessage) => {
  await axiosApi.post('/messages', newMessage);
});

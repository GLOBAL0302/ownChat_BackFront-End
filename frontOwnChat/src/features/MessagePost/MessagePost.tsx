import { Button, Grid, TextField } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useState } from 'react';
import { messageMutation } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { postNewMessage } from '../Messages/messagesThunk';


const initialState = {
  author:"",
  message:""
}

const MessagePost = () => {
  const dispatch = useAppDispatch();
  const [messageMutation, setMessageMutation] = useState<messageMutation>(initialState)

  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = event.target;
    setMessageMutation((prevState)=>(
      {
        ...prevState,
        [name]:value
      }
    ))
  }

 const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   dispatch(postNewMessage(messageMutation));
 }


  return (
    <Grid
      onSubmit={onSubmit}
      container spacing={2} component="form" display="flex">
      <Grid
        width="100%"
        item>
        <TextField
          required
          value={messageMutation.author}
          onChange={onChange}
          fullWidth
          name="author" id="author" label="Author" variant="standard" color="primary" />
      </Grid>
      <Grid item width="100%">
        <TextField
          required
          value={messageMutation.message}
          onChange={onChange}
          fullWidth
          name="message" id="message" label="Message" variant="standard" color="primary" />
      </Grid>
      <Grid item sx={{marginLeft:"auto"}}>
        <Button
        type="submit"
          variant="contained" color="primary">
          Post
          <MailOutlineIcon sx={{ marginLeft:"10px" }}/>
        </Button>
      </Grid>
    </Grid>
  );
};

export default MessagePost;
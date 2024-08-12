import { Grid, TextField } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { useState } from 'react';
import { messageMutation } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { postNewMessage } from '../Messages/messagesThunk';
import { motion } from 'framer-motion';
import { LoadingButton } from '@mui/lab';
import { selectPostMessageLoading } from '../Messages/messagesSlice';


const initialState = {
  author: '',
  message: '',
};

const MessagePost = () => {
  const dispatch = useAppDispatch();
  const postMessageLoading = useAppSelector(selectPostMessageLoading);
  const [messageMutation, setMessageMutation] = useState<messageMutation>(initialState);

  console.log(postMessageLoading);
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setMessageMutation((prevState) => (
      {
        ...prevState,
        [name]: value,
      }
    ));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(postNewMessage(messageMutation));
  };

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
      <Grid item sx={{ marginLeft: 'auto' }}>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <LoadingButton
            type="submit"
            size="large"
            endIcon={<MailOutlineIcon sx={{ marginLeft: '10px' }} />}
            loading={postMessageLoading}
            loadingPosition="end"
            variant="contained"
          >
            <span>Send</span>
          </LoadingButton>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default MessagePost;
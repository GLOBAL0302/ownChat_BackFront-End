import { Grid, Paper, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { IMessagesDB } from '../../types';

interface Props {
  message: IMessagesDB;
}

const Message: React.FC<Props> = ({ message }) => {
  const dateTime = dayjs(message.createAt).format('HH:mm:ss DD/MM/YYYY');
  return (
    <Paper elevation={4} sx={{ padding: '10px', marginBottom: '10px' }}>
      <Grid container component="div" display="flex" direction="column">
        <Typography variant="body1" color="black" component="p">
          Author: {message.author}
        </Typography>
        <Typography variant="body1" color="textSecondary" component="p">
          {message.message}
        </Typography>
        <Typography
          sx={{ textDecoration: 'underline' }}
          marginLeft={'auto'}
          variant="body2"
          color="black"
          component="p"
        >
          {dateTime}
        </Typography>
      </Grid>
    </Paper>
  );
};

export default Message;

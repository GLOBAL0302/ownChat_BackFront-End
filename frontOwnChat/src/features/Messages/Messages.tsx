import { Badge, Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useEffect } from 'react';
import { getAllMessages } from './messagesThunk';
import { selectAllMessages, selectAllMessagesLoading } from './messagesSlice';
import Message from './Message';
import DraftsIcon from '@mui/icons-material/Drafts';


const Messages = () => {
  const dispatch = useAppDispatch();

  const messagesLoading = useAppSelector(selectAllMessagesLoading);

  const allMessages = useAppSelector(selectAllMessages);

  useEffect(() => {
    dispatch(getAllMessages("2024-08-10T15:54:19.171Z"));
  }, []);

  return (
    <Box sx={{border:"1px solid black", padding:"10px", overflow:"auto"}}>
      <Typography variant="h6" color="textSecondary" marginBottom={3}>
        All Messages
        <Badge badgeContent={allMessages.length} color="primary" >
          <DraftsIcon color="action" />
        </Badge>
      </Typography>
      {allMessages.map((message)=>(
        <Message
          key={message.id}
          message={message}/>
      ))}
    </Box>
  );
};

export default Messages;
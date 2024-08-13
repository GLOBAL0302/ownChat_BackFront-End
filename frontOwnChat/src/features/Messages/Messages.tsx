import { Badge, Box, CircularProgress, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useCallback, useEffect, useState } from 'react';
import { getAllMessages } from './messagesThunk';
import { selectAllMessages, selectAllMessagesLoading } from './messagesSlice';
import Message from './Message';
import DraftsIcon from '@mui/icons-material/Drafts';
import { motion } from 'framer-motion';
import axiosApi from '../../axiosApi';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

let myInterval = 0;
let time: string;
const Messages = () => {
  const [lastTime, setLastTime] = useState<string>(time);
  const dispatch = useAppDispatch();
  const messagesLoading = useAppSelector(selectAllMessagesLoading);
  const allMessages = useAppSelector(selectAllMessages);

  const setTime = useCallback(async () => {
    if (!lastTime) {
      const { data } = await axiosApi.get('/messages');
      setLastTime(data[0].createAt);
    }
    if (lastTime) {
      myInterval = setInterval(() => {
        dispatch(getAllMessages(lastTime));
      }, 3000);
    }
  }, [lastTime]);

  useEffect(() => {
    clearInterval(myInterval);
    void setTime();
  }, [setTime]);

  return (
    <Box
      sx={{
        border: '4px dashed silver',
        padding: '10px',
        overflow: 'auto',
        height: '60%',
      }}
    >
      <Typography
        variant="h6"
        color="textSecondary"
        marginBottom={3}
        textAlign="center"
      >
        All Messages
        <Badge badgeContent={allMessages.length} color="primary">
          <DraftsIcon color="action" />
        </Badge>
      </Typography>
      {messagesLoading && allMessages.length > 0 ? (
        <motion.div
          className="container"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {allMessages.map((message) => (
            <motion.div key={message.id} className="item" variants={item}>
              <Message key={message.id} message={message} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <Box
          component="div"
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
        >
          <CircularProgress />
          <Typography variant="h4" component="h4">
            ...Waiting for your message
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Messages;

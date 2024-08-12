import { Badge, Box, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useCallback, useEffect, useState } from 'react';
import { getAllMessages } from './messagesThunk';
import { selectAllMessages, selectAllMessagesLoading } from './messagesSlice';
import Message from './Message';
import DraftsIcon from '@mui/icons-material/Drafts';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

let lastTimeAt = new Date().toISOString();
let myInterval = 0

const Messages = () => {
  const [lastTime, setLastTime] = useState<string>(
    lastTimeAt
  );
  const dispatch = useAppDispatch();
  const messagesLoading = useAppSelector(selectAllMessagesLoading);
  const allMessages = useAppSelector(selectAllMessages);

  const setTime = useCallback(async ()=>{
    myInterval = setInterval(()=>{
      dispatch(getAllMessages(lastTime));
    }, 3000)
  }, [lastTime])

  useEffect(() => {
    dispatch(getAllMessages(lastTime));
    clearInterval(myInterval);
    setTime()
  }, [dispatch]);


  return (
    <Box sx={{ border: "1px solid black", padding: "10px", overflow: "auto" }}>
      <Typography variant="h6" color="textSecondary" marginBottom={3}>
        All Messages
        <Badge badgeContent={allMessages.length} color="primary">
          <DraftsIcon color="action" />
        </Badge>
      </Typography>
      <motion.div
        className="container"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {allMessages.map((message) => (
          <motion.div key={message.id} className="item" variants={item}>
          <Message
          key={message.id}
          message={message} />
          </motion.div>
        ))}
      </motion.div>
    </Box>
);
};

export default Messages;
import { Box, Typography } from '@mui/material';

const Messages = () => {
  return (
    <Box sx={{border:"1px solid black", padding:"5px"}}>
      <Typography variant="h5" color="textSecondary">
        All Messages
      </Typography>
    </Box>
  );
};

export default Messages;
import './App.css';
import MessagePost from './features/MessagePost/MessagePost';
import { Container, Divider } from '@mui/material';
import Messages from './features/Messages/Messages';
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide';

const App = () => {
  return (
    <Container
      sx={{
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Messages />
      <Divider sx={{ mt: 'auto' }}>
        <KeyboardHideIcon
          sx={{
            padding: '5px',
            border: '2px solid black',
            borderRadius: '50%',
          }}
        />
      </Divider>
      <MessagePost />
    </Container>
  );
};

export default App;

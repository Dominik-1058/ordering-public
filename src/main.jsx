import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import '@mantine/core/styles/global.css';
import '@mantine/core/styles.css';
import '@mantine/core/styles/ScrollArea.css';
import '@mantine/core/styles/UnstyledButton.css';
import '@mantine/core/styles/VisuallyHidden.css';
import '@mantine/core/styles/Paper.css';
import '@mantine/core/styles/Popover.css';
import '@mantine/core/styles/CloseButton.css';
import '@mantine/core/styles/Group.css';
import '@mantine/core/styles/Loader.css';
import '@mantine/core/styles/Overlay.css';
import '@mantine/core/styles/ModalBase.css';
import '@mantine/core/styles/Input.css';
import '@mantine/core/styles/InlineInput.css';
import '@mantine/core/styles/Flex.css';
import { MantineProvider } from '@mantine/core';
import App from './App.jsx'
import { AuthProvider } from './AuthContext.jsx';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';

const theme = {
  fontFamily: "source-serif-4-variable, sans-serif",
  fontVariationSettings: "'wght' 400, 'opsz' 20, 'ital' 1",
  colors: {
    mainYellow: [
      '#E9C896',
      '#E9C896',
      '#E9C896',
      '#E9C896',
      '#E9C896',
      '#E9C896',
      '#E9C896',
      '#E9C896',
      '#E9C896',
      '#E9C896',
    ],
    mainBg: ['#1F1F1F', '#2C2C2C', '#333333', '#707070'],
    mainText: ['#fff'],
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <Notifications />
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </MantineProvider>
  </React.StrictMode>,
)

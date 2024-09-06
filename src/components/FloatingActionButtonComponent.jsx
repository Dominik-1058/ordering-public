import { IconQrcode } from '@tabler/icons-react';
import { ActionIcon, Affix, Text, Box } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import QrCodeComponent from './QrCodeComponent';
import { useState } from 'react';



function FloatingActionButtonComponent() {
  const [openedQr, setOpenedQr] = useState(false);
  const ref = useClickOutside(() => setOpenedQr(false));

  return (
    <>
      {openedQr && (
      <Affix onClose={() => setOpenedQr(false)} position={{ bottom: 60, right: 60 }} ref={ref} hiddenFrom='xs'>
        <Box
          style={{
            position: 'fixed',     // Fixes the position relative to the viewport
            width: '90%',
            bottom: '15px',             // Sticks to the bottom of the viewport
            left: '50%',               // Sticks to the left of the viewport
            transform: 'translateX(-50%)', // Centers the box horizontally
            zIndex: 9999,          // Ensures it is above other components
            padding: '1rem',      // Optional: adds padding inside the box
            backgroundColor: 'var(--mantine-color-mainYellow-5)', // Optional: background color for visibility
            borderRadius: '30px',  // Optional: adds rounded corners
          }}
        >
          <QrCodeComponent />
        </Box> 
      </Affix>
      )}
      
      <Affix position={{ bottom: 30, right: 30 }} >

        <ActionIcon onClick={() => setOpenedQr(true)} variant='filled' color="green" radius="lg" size={50} style={{ background: 'var(--mantine-color-mainYellow-5)' }} hiddenFrom='xs'>
          <IconQrcode stroke={1.5} size={30} />
        </ActionIcon>
      </Affix>
    </>
  );
}

export default FloatingActionButtonComponent;
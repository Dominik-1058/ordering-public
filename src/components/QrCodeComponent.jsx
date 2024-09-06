import React from 'react';
import QRCodeSVG from 'qrcode.react';
import { Box, Container, Group, Stack, Table, Title } from '@mantine/core';

import config from '../config.cfg';

const QrCodeComponent = () => {
    const url = config.qrCodeUrl;

    return (
        <Box>
            <Group>
                <Title order={3} pb={'1rem'} >Let other people join you!</Title>
            </Group>
            <QRCodeSVG value={url} renderAs='svg' bgColor='var(--mantine-color-mainYellow-5)' />
        </Box>
    );
}

export default QrCodeComponent;
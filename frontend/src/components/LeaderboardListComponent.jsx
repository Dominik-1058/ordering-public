import { useEffect, useState } from 'react';
import { Box, Container, Grid, Group, Stack, Table, Title, Text } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';

const LeaderboardListComponent = ({ leaderboard_type, type }) => {
    const theme = useMantineTheme();

    const getScore = (user) => {
    
        if (type === 'total') {
            return user.score;
        } else if (type === 'alcoholic') {
            return user.score_alcohol;
        }else if (type === 'non_alcoholic') {
            return user.score_non_alcohol; // please ignore the naming
        }
    }

    const leaderboard = leaderboard_type.map((user, index) => {
        const position = index + 1;
        const score = getScore(user);

        return (
            <Box key={user.name}>
                <Grid align='center' style={{ height: '4rem' }}>
                    <Grid.Col span={3} align='center'>
                        <Title>{position}</Title>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Text>{user.name}</Text>
                    </Grid.Col>
                    <Grid.Col span={3} align='center'>
                        <Text>{score}</Text>
                    </Grid.Col>
                </Grid>
            </Box>
        );
    });

    return (
        <Stack mt="md" style={{ backgroundColor: 'var(--mantine-color-mainBg-2)', gap: 0, borderRadius: '30px' }}>
            {leaderboard}
        </Stack>            
    );
};

export default LeaderboardListComponent;
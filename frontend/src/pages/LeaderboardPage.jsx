import { useEffect, useState } from 'react';
import { Box, Container, Grid, Group, Stack, Table, Title, Text, Center, SegmentedControl } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import LeaderboardListComponent from '../components/LeaderboardListComponent';

import QrCodeComponent from '../components/QrCodeComponent';
import FloatingActionButtonComponent from '../components/FloatingActionButtonComponent';

const LeaderboardPage = () => {
    const [activeSegment, setActiveSegment] = useState('Total');
    const [leaderboardData, setLeaderboardData] = useState({
        leaderboard: [],
        leaderboard_alcoholic: [],
        leaderboard_non_alcoholic: [],
    });

    useEffect(() => {
        // Fetch users from the API
        fetch('http://127.0.0.1:8000/api/users/leaderboard')
            .then((response) => {
                if (response.ok) { return response.json(); }
                throw response
            })
            .then((data) => {
                setLeaderboardData({
                    leaderboard: data.total,
                    leaderboard_alcoholic: data.alcoholic,
                    leaderboard_non_alcoholic: data.non_alcoholic,
                });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    console.log("Leaderboard data: ", leaderboardData);

    return (
        <Box>
            <Container>
                <Box style={{ padding: '1rem' }}>
                    <Text c='mainYellow.5' component='small' size='sm'>Steckerlbrot Party</Text>
                    <Title c='mainYellow.5' order={2}>Leaderboard</Title>
                </Box>

                {(leaderboardData.leaderboard.length > 0) ? (
                    <>
                        <SegmentedControl 
                            size="xs" 
                            data={['Total', 'Alcoholic', 'Non alcoholic']}
                            transitionDuration={500}
                            style={{ 
                                height: '100%',
                                backgroundColor: 'var(--mantine-color-mainYellow-5)',
                            }}
                            value={activeSegment}
                            onChange={setActiveSegment}
                        />

                        {activeSegment === 'Total' && (
                            <LeaderboardListComponent 
                                leaderboard_type={leaderboardData.leaderboard}
                                type="total"
                            />
                        )}
                        {activeSegment === 'Alcoholic' && (
                            <LeaderboardListComponent 
                                leaderboard_type={leaderboardData.leaderboard_alcoholic}
                                type="alcoholic"
                            />
                        )}
                        {activeSegment === 'Non alcoholic' && (
                            <LeaderboardListComponent 
                                leaderboard_type={leaderboardData.leaderboard_non_alcoholic}
                                type="non_alcoholic"
                            />
                        )}
                    </>
                ) : ( <Group justify='center' align='center'>
                        <Title order={3}>Noone is drinking yet?</Title>
                    </Group>)}
            </Container>

            {/*<QrCodeComponent />*/}
            <FloatingActionButtonComponent />
        </Box>
    );
}

export default LeaderboardPage;
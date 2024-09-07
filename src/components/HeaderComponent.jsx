import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconChartBar, IconHome2, IconAdjustmentsHorizontal, IconGauge, IconLogout, IconCircleOff, IconGlassCocktail, IconHandFingerLeft } from '@tabler/icons-react';
import { Container, Text, Group, Burger, Drawer, Anchor, Stack, NavLink, Button, Box, Title, SegmentedControl } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './HeaderComponent.module.css';
import { useAuth } from '../AuthContext';

const links = [
  { link: '/ordering-public/', label: 'Home', icon: <IconGlassCocktail size="2rem" stroke={1.5}/> },
  { link: '/ordering-public/#/leaderboard', label: 'Leaderboard', icon: <IconChartBar size="2rem" stroke={1.5}/> },
  { link: '/ordering-public/#/admin/manage-ingredients', label: 'Ingredients', icon: <IconGlassCocktail size="2rem" stroke={1.5}/>},
  { link: '/ordering-public/#/admin/manage-items', label: 'Items', icon: <IconHome2 size="2rem" stroke={1.5}/> },
  { link: '/ordering-public/#/admin/manage-orders', label: 'Orders', icon: <IconGauge size="2rem" stroke={1.5}/> },
];

export function HeaderSimple() {
  const [opened, {toggle}] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);

  const items = links.map((link) => (
      <Anchor
        key={link.label}
        href={link.link}
        className={classes.link}
        p={5}
      >{link.label}</Anchor>
  ));

  {/*const mobile_items = links.map((link) => (
    <NavLink
      key={link.label}
      href={link.link}
      label={link.label}
      leftSection={link.icon}
      p={5}
    />
    ));*/}

  const homeLink = links.find(link => link.label === 'Home');  
  const leaderboardLink = links.find(link => link.label === 'Leaderboard');
  
  const location = useLocation();

  const { user, logout } = useAuth();
  const isAdmin = user && user.username === 'admin';

  const handleLogout = () => {
    logout();
  }

  return (
    <>
      {/* Appshell? wtf. otherwise add padding to content, so it's not behind the header */}
      <header className={classes.header} style={{ position: 'fixed', top: 0, left: 0, right:0, zIndex:1000 }}>
        <div className={classes.inner}>
          
          {isAdmin && (
            <>
              <Group gap={5} visibleFrom="xs">
                {items} 
              </Group>
            </>
          )}

          <Group hiddenFrom={isAdmin ? 'xs' : undefined}>
            {location.pathname === leaderboardLink.link.split('#')[1] ? (
              <>
                <Anchor 
                  key={homeLink.label}
                  href={homeLink.link}
                  style={{ display: 'flex', alignItems: 'center', color: 'var(--mantine-color-mainYellow-4)' }}
                >  
                  {homeLink.icon}
                </Anchor>
              </>
            ) : location.pathname === '/' ? (
              <>
                <Anchor 
                  key={leaderboardLink.label}
                  href={leaderboardLink.link}
                  style={{ display: 'flex', alignItems: 'center', color: 'var(--mantine-color-mainYellow-4)' }}
                >  
                  {leaderboardLink.icon}
                </Anchor>
              </>
            ) : null}

          </Group>
          <Group gap={5}>
            <Text size='xs' style={{ color: 'var(--mantine-color-mainYellow-4)' }}>Hello, {user.username}</Text>
            <Button
              onClick={handleLogout}
              variant='subtle'
            >
              <IconLogout size="1rem" style={{ color: 'var(--mantine-color-mainYellow-4)' }}/>
            </Button>
          </Group>
        </div>
      </header>
    </>
  );
}

export default HeaderSimple
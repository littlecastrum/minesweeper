import React, { FunctionComponent, KeyboardEvent, MouseEvent, ChangeEvent, useState } from 'react';
import clsx from 'clsx';
import { useFetch } from 'react-async';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Drawer, Container, CircularProgress, AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { useLocalStorage } from './lib/helpers';

import { Game, Selector, Menu, Snackbar } from './components';

import { SessionData } from './typings';

const useStyles = makeStyles((theme: Theme) => createStyles({
  '@global body': {
    margin: 0,
    padding: 0,
    fontFamily: 'sans-serif',
    background: '#f4f4f4'
  },
  root: {
    margin: '100px auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  menuButton: {
    marginRight: 10,
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: 300,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
}));

const App: FunctionComponent = () => {
  const classes = useStyles()

  const [difficulty, setDifficulty] = useLocalStorage('difficulty', 8);
  const { data, error, isLoading } = useFetch('/api', {}, {json: true});
  const [userData, setUserData] = useState<SessionData | undefined>(undefined);
  const [openMenu, setOpenMenu] = useState(false);

  const handleChange = (event: ChangeEvent<{ value: unknown; }>) => {
    setDifficulty(event.target.value)
  }

  const renderMenu = (data: SessionData | undefined, error: Error | undefined, isLoading: boolean) => {
    const errorMessage = 'Error: Failure connecting with server'
    if (isLoading) return <CircularProgress />;
    if (error) return <Snackbar message={errorMessage} variant="error"/>
    if (data && !userData) setUserData(data);
    if (userData) {
      const savedGames = userData.games.map(({ lastSaved }) => new Date(lastSaved).toDateString())
      return <Menu data={savedGames}/>
    }
    return null
  }

  const toggleDrawer = (event: KeyboardEvent | MouseEvent) => {
    if (event.type === 'keydown' && ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')) {
      return;
    }
    setOpenMenu(!openMenu);
  };

  return (
    <Box>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer" onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" className={classes.title}>
            Minesweeper
          </Typography>
          <Selector label="Difficulty" handleChange={handleChange} value={difficulty} />
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Drawer open={openMenu} onClose={toggleDrawer} classes={{paper: clsx(classes.drawerPaper, !openMenu && classes.drawerPaperClose)}}>
        {renderMenu(data, error, isLoading)}
      </Drawer>
      <Container className={classes.root}>
        <Game difficulty={difficulty} />
      </Container>
    </Box>
  );
}

export default App;

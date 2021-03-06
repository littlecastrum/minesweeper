import React, { FunctionComponent, KeyboardEvent, MouseEvent, ChangeEvent, Fragment, useState } from 'react';
import clsx from 'clsx';
import { useFetch } from 'react-async';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, Drawer, Container, AppBar, Toolbar, IconButton, Typography, Button, LinearProgress } from '@material-ui/core';
import { Menu as MenuIcon, Save as SaveIcon } from '@material-ui/icons';
import { useLocalStorage } from './lib/hooks';

import { Game, Selector, Menu, Snackbar } from './components';

import { SessionData, SavedGameData, GameData } from './typings';

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
    flexGrow: 1 
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
  appBar: {
    background: '#282827' 
  }
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
    if (isLoading) return <LinearProgress />;
    if (error) return <Snackbar message={errorMessage} variant="error"/>
    if (data && !userData) setUserData(data);
    if (userData) {
      const savedGames: SavedGameData[] = userData.games.reduce((acc: SavedGameData[], game: GameData) => {
        const TooltipMessage = () => (
          <Fragment>
            <Typography color="inherit">Dificulty: {game.difficulty}</Typography>
            <b>Mines: {game.mines}</b>
            <br/>
            <b>Flags: {game.minesCount}</b>
            <br/>
            <b>Time Elapsed: {game.time}</b>
          </Fragment>
        );
        const gameMenuData: SavedGameData = {
          id: game.id,
          text: new Date(game.lastSaved).toDateString(),
          icon: <SaveIcon />,
          details: <TooltipMessage />
        };
        return [...acc, gameMenuData]
      }, []);
      return <Menu data={savedGames} title={'Game Menu'}/>
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
      <AppBar position="fixed" className={classes.appBar}>
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

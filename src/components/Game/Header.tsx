import React, { FunctionComponent, MouseEvent } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Mood as Start,
  DirectionsRun as Running,
  SentimentVeryDissatisfied as Lost,
  LocalHotel as Paused
} from '@material-ui/icons';
import { Tooltip, IconButton, Typography, Box } from '@material-ui/core';

import { GameState } from '../../typings';

import Timer, { timerState } from './Timer';

const useStyles = makeStyles({
  details: {
    marginBottom: '20px',
    background: '#19a0d9',
    padding: '7px',
    textAlign: 'center',
    color: '#fff',
    minHeight: '100px',
    borderRadius: '7px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  gameState: {
    display: 'flex',
    flexDirection: 'column'
  }
});

const titles = {
  [GameState.LOADING]: 'Press icon to play',
  [GameState.RUNNING]: 'Game in progress',
  [GameState.PAUSED]: 'Game Paused',
  [GameState.ENDED]: 'Restart to play again',
}

const icons = {
  [GameState.LOADING]: <Start />,
  [GameState.RUNNING]: <Running />,
  [GameState.PAUSED]: <Paused />,
  [GameState.ENDED]: <Lost />,
}

const getTimerState = (gameState: GameState): timerState => {
  if (gameState === GameState.RUNNING) {
    return 'START';
  }
  if (gameState === GameState.LOADING) {
    return 'RESET';
  }
  return 'STOP';
}

interface Props {
  gameState: GameState,
  mines: number,
  handleGameState: (event: MouseEvent) => void;
}

const Header: FunctionComponent<Props> = ({ gameState, mines, handleGameState }) => {
  const classes = useStyles();
  return (  
    <div className={classes.details}>
      <Timer state={getTimerState(gameState)}/>
      <div className={classes.gameState}>
        <Box component="div">
          <IconButton onClick={handleGameState}>{icons[gameState]}</IconButton>
        </Box>
        <Typography>
          {titles[gameState]}
        </Typography>
      </div>
      <Tooltip title="Mines Counter">
        <Typography>{mines}</Typography>
      </Tooltip>
    </div>
  )
};

export default Header;
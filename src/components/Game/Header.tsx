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
    background: 'cornflowerblue',
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
  switch (gameState) {
    case GameState.RUNNING:
      return 'START';
    case GameState.LOADING:
      return 'RESET';
    default:
      return 'STOP';
  }
}

const getTimerTooltip = (gameState: GameState): string => {
  switch (gameState) {
    case GameState.RUNNING:
      return 'Pause';
    case GameState.LOADING:
      return 'Start';
    case GameState.ENDED:
      return 'Restart';
    default:
      return 'Resume';
  }
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
          <Tooltip title={getTimerTooltip(gameState)}>
            <IconButton onClick={handleGameState}>{icons[gameState]}</IconButton>
          </Tooltip>
        </Box>
        <Typography>
          {titles[gameState]}
        </Typography>
      </div>
      <Tooltip title="Flag Counter">
        <Typography>{mines}</Typography>
      </Tooltip>
    </div>
  )
};

export default Header;
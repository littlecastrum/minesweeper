import React, { FunctionComponent, MouseEvent, useState } from 'react';
import { makeStyles } from '@material-ui/core';

import { buildCell } from '../../lib/helpers';

import { GameState, Window } from '../../typings';

import Board from './Board';
import Header from './Header';

const useStyles = makeStyles({
  root: {
    width: '450px',
    position: 'absolute',
    left: '40%'
  }
})

interface Props {
  window: Window;
  mines: number
}

export const Game: FunctionComponent<Props> = ({ window, mines }) => {
  const [board, setBoard] = useState([[buildCell(0,0), buildCell(0,1)], [buildCell(1,0), buildCell(1,1)]]);
  const [state, setState] = useState(GameState.LOADING);
  const [minesCount, setMinesCount] = useState(mines);

  const classes = useStyles();

  const lookup = () => {
    console.log('click');
    setState(GameState.ENDED);
    return true;
  }

  const flagging = () => {
    console.log('right click');
    return true;
  }
  
  const handleGameStart = () => {
    if (state === GameState.LOADING || state === GameState.PAUSED) {
      setState(GameState.RUNNING);
    } else if (state === GameState.RUNNING) {
      setState(GameState.PAUSED);
    } else if (state === GameState.ENDED) {
      setState(GameState.LOADING);
      setBoard([[buildCell(0,0), buildCell(0,1)], [buildCell(1,0), buildCell(1,1)]]);
      setMinesCount(mines);
    }
    return;
  }

  return (
    <div className={classes.root}>
      <Header gameState={state} mines={minesCount} handleGameState={handleGameStart}/>
      <Board data={board} lookup={lookup} flagging={flagging}/>
    </div>
  )
};

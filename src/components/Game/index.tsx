import React, { FunctionComponent, MouseEvent, useState } from 'react';
import { makeStyles } from '@material-ui/core';

import { createBoard, isMined, canToggleFlag } from '../../lib/helpers';

import { GameState, Window, CellData } from '../../typings';

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
  const [board, setBoard] = useState(createBoard(window, mines));
  const [state, setState] = useState(GameState.LOADING);
  const [minesCount, setMinesCount] = useState(mines);

  const classes = useStyles();

  const lookup = (cell: CellData) => {
    if (cell.flagged || state !== GameState.RUNNING) return false;

    if (isMined(cell)) {
      setState(GameState.ENDED);
      alert('Game Over');
    }

    const { x, y } = cell.coordinates;
    board[x][y] = cell;

    return true;
  }

  const flagging = (cell: CellData) => {
    if (state !== GameState.RUNNING || !canToggleFlag(cell, minesCount)) return false; 

    const { flagged, coordinates: { x, y } } = cell;

    board[x][y] = cell;


    if (flagged) {
      setMinesCount(minesCount - 1);
    } else {
      setMinesCount(minesCount + 1);
    }

    return true;
  }
  
  const handleGameState = () => {
    if (state === GameState.LOADING || state === GameState.PAUSED) {
      setState(GameState.RUNNING);
    } else if (state === GameState.RUNNING) {
      setState(GameState.PAUSED);
    } else if (state === GameState.ENDED) {
      setState(GameState.LOADING);
      setBoard(createBoard(window, mines));
      setMinesCount(mines);
    }
    return;
  }

  return (
    <div className={classes.root}>
      <Header gameState={state} mines={minesCount} handleGameState={handleGameState}/>
      <Board data={board} lookup={lookup} flagging={flagging}/>
    </div>
  )
};

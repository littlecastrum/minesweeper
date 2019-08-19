import React, { FunctionComponent, MouseEvent, useState } from 'react';
import { isEqual } from 'lodash';
import { makeStyles } from '@material-ui/core';

import {
  createBoard,
  isMined,
  isEmpty,
  canToggleFlag,
  getMinedCells,
  getFlaggedCells,
  getCellsCount,
  revealEmpty
} from '../../lib/helpers';

import { GameState, Window, CellData, CellState } from '../../typings';

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

  const revealBoard = () => {
    const reveledBoard = board.map((row) => {
      return row.map((cell) => {
        cell.state = CellState.REVEALED;
        return cell;
      });
    });
    setBoard(reveledBoard);
  }

  const lookup = (cell: CellData) => {
    if (cell.flagged || state !== GameState.RUNNING) {
      return false;
    };

    if (isMined(cell)) {
      setState(GameState.ENDED);
      revealBoard();
      alert('Game Over');
    }

    const { x, y } = cell.coordinates;
    board[x][y] = cell;
    const newBoard = [...board];

    if (isEmpty(cell)) {
      revealEmpty(cell.coordinates, newBoard, window);
      setBoard(newBoard);
    }
    
    const hiddenCells = getCellsCount(CellState.HIDDEN, newBoard);

    if (hiddenCells === mines) {
      setState(GameState.ENDED);
      revealBoard();
      alert('You Win 😊');
    }

    return true;
  }

  const flagging = (cell: CellData) => {
    if (state !== GameState.RUNNING || !(canToggleFlag(cell, minesCount))) return false; 

    const { flagged, coordinates: { x, y } } = cell;

    board[x][y] = cell;

    const newBoard = [...board];

    let newMines = minesCount;

    if (flagged) {
      newMines--;
    } else {
      newMines++;
    }

    if (newMines === 0) {
      const minedCells = getMinedCells(newBoard);
      const flaggedCells = getFlaggedCells(newBoard);

      if (isEqual(minedCells, flaggedCells)) {
        setState(GameState.ENDED);
        revealBoard();
        alert("You Win");
      }
    }

    setMinesCount(newMines);
    setBoard(newBoard);
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

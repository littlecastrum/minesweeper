import React, { FunctionComponent, useEffect, useState } from 'react';
import { isEqual } from 'lodash';
import { makeStyles } from '@material-ui/core';
import { useLocalStorage } from '../lib/hooks'
import {
  createBoard,
  isMined,
  isEmpty,
  canToggleFlag,
  getMinedCells,
  getFlaggedCells,
  getCellsCount,
  revealEmpty,
  revealBoard
} from '../lib/helpers';

import { GameState, CellData, CellState } from '../typings';

import { Board, Header, Snackbar } from '.';

const useStyles = makeStyles({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
})

interface Props {
  difficulty: number
}

const Game: FunctionComponent<Props> = ({ difficulty }) => {
  const [window, setWindow] = useLocalStorage('window', { width: difficulty, height: difficulty });
  const [mines, setMines] = useLocalStorage('mines', difficulty);
  const [board, setBoard] = useLocalStorage('board', createBoard(window, mines));
  const [state, setState] = useLocalStorage('state', GameState.LOADING);
  const [minesCount, setMinesCount] = useLocalStorage('minesCount', mines);
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    if (difficulty !== mines) {
      const newWindow = { width: difficulty, height: difficulty };
      const newMines = difficulty;
      setBoard(createBoard(newWindow, newMines));
      setState(GameState.LOADING);
      setMinesCount(newMines);
      setWindow(newWindow);
      setMines(newMines);
    }
  });

  const classes = useStyles();

  const lookup = (cell: CellData) => {
    if (cell.flagged || state !== GameState.RUNNING) {
      return false;
    };

    if (isMined(cell)) {
      setState(GameState.ENDED);
      const revealedBoard = revealBoard(board);
      setBoard(revealedBoard);
      return false;
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
      const revealedBoard = revealBoard(newBoard);
      setBoard(revealedBoard);
      setIsWin(true);
      return false;
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
        const revealedBoard = revealBoard(newBoard);
        setBoard(revealedBoard);
        setIsWin(true);
        return false;
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

  const renderSnackBar = () => {
    if (state !== GameState.ENDED) return null;
    if (isWin) return <Snackbar message={'Congratulations! You have won 😊'} variant="success"/>
    return <Snackbar message={'We are sorry! You have lost 😭'} variant="error"/>
  }

  return (
    <div className={classes.root}>
      <Header gameState={state} mines={minesCount} handleGameState={handleGameState}/>
      <Board window={window} data={board} lookup={lookup} flagging={flagging}/>
      {renderSnackBar()}
    </div>
  )
};

export default Game;

import React, { FunctionComponent, MouseEvent, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { GameState, Window } from '../../typings';

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
  const [board, setBoard] = useState([]);
  const [state, setState] = useState(GameState.LOADING);
  const [minesCount, setMinesCount] = useState(mines);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* 
        Header
        Board
      */}
    </div>
  )
};

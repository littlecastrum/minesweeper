import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/styles';
import { GameBoard, CellData, Window } from '../../typings';

import Row from './Row';

const setStyles = ({ width }: Window) => {
  const getWidth = (width: number): number => ({
    [8 as number]: 375,
    [16 as number]: 725,
    [32 as number]: 700
  }[width]);

  return makeStyles({
    board: {
      width: getWidth(width),
      margin: '0 auto'
    }
  });
};

interface Props {
  data: GameBoard;
  window: Window
  flagging: (cell: CellData) => boolean;
  lookup: (cell: CellData) => boolean;
}

const Board: FunctionComponent<Props> = ({ window, data, flagging, lookup }) => {
  const useStyles = setStyles(window);
  const classes = useStyles();

  return (
    <div className={classes.board}>
      {
        data.map((row, idx) => (
          <Row 
            key={idx}
            window={window}
            data={row}
            flagging={flagging}
            lookup={lookup}
          />
        ))
      }
    </div>
  );
};

export  default Board;
import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/styles';
import { GameBoard, CellData, Window } from '../../typings';

import Row from './Row';

const setStyles = ({ width }: Window) => {
  return makeStyles({
    board: {
      width: 'max-content',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      border: 'groove rgba(0,0,0,0.5) 4px'
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
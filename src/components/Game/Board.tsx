import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/styles';
import { GameBoard, CellData, Window } from '../../typings';

import Cell from './Cell';

const setStyles = (window: Window) => makeStyles({
  board: {
    width: window.width * 42,
    margin: '0 auto'
  },
  cell: {
    display: 'inline-block'
  },
  clear: {
    clear: 'both',
    content: ''
  }
});

interface Props {
  window: Window
  data: GameBoard;
  flagging: (cell: CellData) => boolean;
  lookup: (cell: CellData) => boolean;
}

const Board: FunctionComponent<Props> = ({ window, data, flagging, lookup }) => {
  const useStyles = setStyles(window);
  const classes = useStyles();

  return (
    <div className={classes.board}>
      {
        data.map((row) => {
          return row.map((cell) => {
            const coords = cell.coordinates
            const cellKey = `${coords.x}::${coords.y}`;
            return (
              <div key={cellKey} className={classes.cell}>
                <Cell click={lookup} rightClick={flagging} data={cell} />
                {(row[row.length - 1] === cell) ? <div className={classes.clear} /> : ''}
              </div>
            );
          })
        })
      }
    </div>
  );
};

export default Board;

import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/styles';

import { GameBoard, CellData } from '../../typings';

import Cell from './Cell';

const useStyles = makeStyles({
  board: {
    width: '220px',
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
  data: GameBoard;
  flagging: (cell: CellData) => boolean;
  lookup: (cell: CellData) => boolean;
}

const Board: FunctionComponent<Props> = ({ data, flagging, lookup }) => {
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

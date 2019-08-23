import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/styles';
import { CellData, Window } from '../../typings';

import Cell from './Cell';

const useStyles = makeStyles({
  row: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  cell: {
    display: 'inline-block',
    margin: '2px 0'
  },
  clear: {
    clear: 'both',
    content: ''
  }
})

interface RowProps {
  data: CellData[];
  window: Window
  flagging: (cell: CellData) => boolean;
  lookup: (cell: CellData) => boolean;
}

const Row: FunctionComponent<RowProps> = ({ data, window, flagging, lookup }) => {
  const classes = useStyles();
  return (
    <div className={classes.row}>
      {              
        data.map((cell) => {
          const coords = cell.coordinates
          const cellKey = `${coords.x}::${coords.y}`;
          const isLastCell = data[data.length - 1] === cell;
          return (
            <div key={cellKey} className={classes.cell}>
              <Cell window={window} click={lookup} rightClick={flagging} data={cell} />
              { isLastCell ? <div className={classes.clear} /> : ''}
            </div>
          );
        })
      }
    </div>
  );
};

export default Row;

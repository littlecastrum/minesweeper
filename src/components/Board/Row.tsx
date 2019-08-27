import React, { FunctionComponent, Fragment, memo } from 'react';
import { makeStyles } from '@material-ui/styles';
import { CellData, Window } from '../../typings';
import Cell from './Cell';

const useStyles = makeStyles({
  row: {

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
            <Fragment key={cellKey}>
              <Cell window={window} click={lookup} rightClick={flagging} data={cell} />
              { isLastCell ? <div className={classes.clear} /> : ''}
            </Fragment>
          );
        })
      }
    </div>
  );
};

export default memo(Row);

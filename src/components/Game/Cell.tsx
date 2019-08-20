import React, { FunctionComponent, MouseEvent, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { isRevealed, isMined, usePrevious } from '../../lib/helpers';
import { CellData, CellState } from '../../typings';

const useStyles = makeStyles({
  cell: {
    background: '#7b7b7b',
    border: '1px solid #fff',
    float: 'left',
    lineHeight: '45px',
    height: '25px',
    textAlign: 'center',
    width: '25px',
    cursor: 'pointer',
    borderRadius: '5px',
    color: '#fff',
    fontWeight: 600,
    '&:focus': {
      outline: 'none',
    }
  },
  hidden: {
    background: '#2e2829'
  },
  warning: {
    color: '#fc543c'
  }
});

interface Props {
  data: CellData;
  click: (cell: CellData) => boolean;
  rightClick: (cell: CellData) => boolean;
}

const Cell: FunctionComponent<Props> = ({ data, click, rightClick }) => {
  const classes = useStyles();
  
  const [cellData, setCellData] = useState(data);

  const prevData = usePrevious(data);

  useEffect(() => {
    if (prevData !== data) {
      setCellData(data)
    }
  }, [prevData, data])

  const warningClass = isMined(cellData) || cellData.flagged ? classes.warning : null;
  const hiddenClass = isRevealed(cellData) ? null : classes.hidden;
  
  const getValue = (cellData: CellData) => {
    if (!isRevealed(cellData)) {
      return cellData.flagged ? "🚩" : null;
    }
    if (isMined(cellData) && cellData.flagged) {
      return "❌";
    }
    if (isMined(cellData)) {
      return "💣";
    }
    if (cellData.neighbour === 0) {
      return null;
    }
    return cellData.neighbour;
  }

  const handleClick = (evt: MouseEvent) => {
    if (isRevealed(cellData)) return;
    const newCell = { ...cellData, state: CellState.REVEALED };
    const isRunning = click(newCell);
    if (isRunning) {
      setCellData(newCell);
    }
  }

  const handleRightClick = (evt: MouseEvent) => {
    evt.preventDefault();
    if (isRevealed(cellData)) return;
    const newCell = { ...cellData, flagged: !cellData.flagged };
    const isRunning = rightClick(newCell);
    if (isRunning) {
      setCellData(newCell);
    }
  }

  return (
    <div onClick={handleClick} onContextMenu={handleRightClick} className={clsx(classes.cell, warningClass, hiddenClass)}>
      {getValue(cellData)}
    </div>
  );
};

export default Cell;

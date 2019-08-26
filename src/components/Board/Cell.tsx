import React, { FunctionComponent, MouseEvent, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import { isRevealed, isMined, usePrevious } from '../../lib/helpers';
import { CellData, CellState, Window } from '../../typings';
import { Typography, IconButton } from '@material-ui/core';

const setStyles = (window: Window) => makeStyles({
  root: {
    background: '#7b7b7b',
    border: '1px solid #fff',
    float: 'left',
    height: 40,
    textAlign: 'center',
    width: 40,
    cursor: 'pointer',
    borderRadius: '5px',
    color: '#fff',
    fontWeight: 600,
    '&:focus': {
      outline: 'none',
    }
  },
  content: {
    lineHeight: 0.5,
    fontSize: 'initial'
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
  window: Window  
  click: (cell: CellData) => boolean;
  rightClick: (cell: CellData) => boolean;
}

const Cell: FunctionComponent<Props> = ({ data, window, click, rightClick }) => {
  const useStyles = setStyles(window);
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
    <IconButton onClick={handleClick} onContextMenu={handleRightClick} className={clsx(classes.root, warningClass, hiddenClass)}>
      <Typography variant="inherit" className={classes.content}>{getValue(cellData)}</Typography>
    </IconButton>
  );
};

export default Cell;

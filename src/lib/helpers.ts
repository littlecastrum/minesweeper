import { CellData, CellState, GameBoard, Point, CellContains, Window } from '../typings';
import { useEffect, useRef } from 'react';

export function useInterval(callback: Function, delay: number) {
  const savedCallback = useRef<Function>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current && savedCallback.current();
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export function usePrevious(value: any) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

const randomInt = (max: number): number => {
  return Math.floor((Math.random() * 1000) + 1) % max;
};

const traverseBoard = (coordinates: Point, board: GameBoard, window: Window) => {
  const { width, height } = window;
  const { x, y } = coordinates;
  const adjacentCells = [];
  if (x > 0) {
    adjacentCells.push(board[x - 1][y]);
  } 
  if (x < height - 1) {
    adjacentCells.push(board[x + 1][y]);
  }
  if (y > 0) {
    adjacentCells.push(board[x][y - 1]);
  }
  if (y < width - 1) {
    adjacentCells.push(board[x][y + 1]);
  }
  if (x > 0 && y > 0) {
    adjacentCells.push(board[x - 1][y - 1]);
  }
  if (x > 0 && y < width - 1) {
    adjacentCells.push(board[x - 1][y + 1]);
  }
  if (x < height - 1 && y < width - 1) {
    adjacentCells.push(board[x + 1][y + 1]);
  }
  if (x < height - 1 && y > 0) {
    adjacentCells.push(board[x + 1][y - 1]);
  }
  return adjacentCells;
};

const buildCell = (x: number, y: number): CellData => ({
  coordinates: { x, y },
  state: CellState.HIDDEN,
  contents: CellContains.EMPTY,
  neighbour: 0,
  flagged: false
});

const plantMines = (board: GameBoard, window: Window, mines: number): GameBoard => {
  const { width, height } = window;
  let minesPlanted = 0;
  while (minesPlanted < mines) {
    const x = randomInt(width);
    const y = randomInt(height);
    const cell = board[x][y]
    if (cell.contents !== CellContains.MINE) {
      cell.contents = CellContains.MINE;
      minesPlanted++;
    }
  }
  return board;
};

const setCells = (board: GameBoard, window: Window) => {
  const { width, height } = window;
  return Array(height).fill(null).map((_, x) => {
    return Array(width).fill(null).map((_, y) => {
      const cell = board[x][y];
      if (!isMined(cell)) {
        const area = traverseBoard(cell.coordinates, board, {width, height});
        const mines = area.reduce((acc, cell) => isMined(cell) ? acc + 1 : acc, 0);
        cell.neighbour = mines;
        cell.contents = mines !== 0 ? CellContains.VALUE : CellContains.EMPTY;
      }
      return cell;
    });
  });
};

export const createBoard = (window: Window, mines: number): GameBoard => {
  const { width, height } = window;
  const cleanBoard = Array(height).fill(null).map((_, x) => {
    return Array(width).fill(null).map((_, y) => {
      return buildCell(x, y);
    });
  });
  const minedBoard = plantMines(cleanBoard, window, mines);
  const setBoard = setCells(minedBoard, window);
  return setBoard;
};

export const canToggleFlag = (cell: CellData, mines: number) => mines > 0 || (mines === 0 && !cell.flagged);

export const isHidden = ({ state }: CellData) => state === CellState.HIDDEN;
export const isRevealed = ({ state }: CellData) => state === CellState.REVEALED;
export const isMined = ({ contents }: CellData) => contents === CellContains.MINE;
export const isValue = ({ contents }: CellData) => contents === CellContains.VALUE;
export const isEmpty = ({ contents }: CellData) => contents === CellContains.EMPTY;

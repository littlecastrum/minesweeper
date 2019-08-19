import { useEffect, useRef } from 'react';

import { CellData, CellState, CellContains } from '../typings';

export function usePrevious(value: any) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

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

export const buildCell = (x: number, y: number): CellData => ({
  coordinates: { x, y },
  state: CellState.HIDDEN,
  contents: CellContains.EMPTY,
  neighbour: 0,
  flagged: false
});


export const isHidden = ({ state }: CellData) => state === CellState.HIDDEN;
export const isRevealed = ({ state }: CellData) => state === CellState.REVEALED;
export const isMined = ({ contents }: CellData) => contents === CellContains.MINE;
export const isValue = ({ contents }: CellData) => contents === CellContains.VALUE;
export const isEmpty = ({ contents }: CellData) => contents === CellContains.EMPTY;
import { ReactElement } from 'react';

export enum GameState {
  LOADING = 'LOADING',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  ENDED = 'ENDED',
}

export type Window = {
  width: number,
  height: number
}

export type Point = {
  x: number,
  y: number
}

export enum CellState {
  HIDDEN = 'HIDDEN',
  REVEALED = 'REVEALED'
}

export enum CellContains {
  MINE = 'MINE',
  VALUE = 'VALUE',
  EMPTY = 'EMPTY'
}

export type CellData = {
  state: CellState,
  coordinates: Point,
  contents: CellContains,
  neighbour: number,
  flagged: boolean
}

export type GameBoard = CellData[][];

export interface GameData {
  id: number;
  mines: number;
  window: Window;
  difficulty: number;
  minesCount: number;
  board: GameBoard;
  state: GameState;
  time: number;
  lastSaved: number;
}

export interface SavedGameData {
  id: number;
  text: string;
  details: ReactElement;
  icon: ReactElement
}
export interface SessionData {
  username: string
  games: GameData[]
}
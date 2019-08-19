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
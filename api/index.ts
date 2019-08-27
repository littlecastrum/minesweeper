import { NowRequest, NowResponse } from '@now/node';
import { createBoard } from '../src/lib/helpers';

export default (req: NowRequest, res: NowResponse) => {
  const difficulty = 8;
  const window = { width: difficulty, height: difficulty };
  const mines = difficulty
  res.status(200).json({
    username: 'littlecastrum',
    games: [
      {
        id: 1,
        mines,
        window,
        difficulty,
        minesCount: mines,
        board: createBoard(window, mines),
        state: 'LOADING',
        time: 0,
        lastSaved: Date.now()
      },
      {
        id: 2,
        mines,
        window,
        difficulty,
        minesCount: mines,
        board: createBoard(window, mines),
        state: 'LOADING',
        time: 0,
        lastSaved: 1565395200
      }
    ]
  })
}
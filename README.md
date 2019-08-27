# Minesweepper

Mineswipper implementation on React.js made with hooks, persistance & deployed using Now.js

To run on development we are using `now` and `yarn`. If you don't have them installed we recommend you do:
```bash
  npm install -g yarn now
```
After you can run tthe dev server with 2 commands:
```bash
  yarn install
  now dev
```
## Details

The application is built with React Hooks for simplicity of logic and TypeScript 
for reliability of types and self documentation

The components structure is divided by the main elements of the Game component:
- Game
  - Board
    - Cell
  - Header
    - Timer
- Menu
  - Item

The game uses a state based behaviour for keeping the expected functions 
to fire:

```TypeScript
enum GameState {
  LOADING = 'LOADING',
  RUNNING = 'RUNNING',
  PAUSED = 'PAUSED',
  ENDED = 'ENDED',
}
```

We use another `enum` to track the cells types to be able to differenciate
them & another for their state:

```TypeScript
enum CellContains {
  MINE = 'MINE',
  VALUE = 'VALUE',
  EMPTY = 'EMPTY'
}

enum CellState {
  HIDDEN = 'HIDDEN',
  REVEALED = 'REVEALED'
}
```

Since the amount of data saved is very small and there is no security concerns
`localstorage` was prefered to `IndexDB` for simplicity. A hook was provided 
to simplify even more the logic

For reduction of complexity the game have 3 levels (Easy, Medium & Hard) which
are the only options available to players at the moment

## Todo
- [x] Minesweeper game logic
- [x] Game can be won and lost
- [x] Game can be started, paused & restarted (After lost)
- [x] Game data is persistent in time
- [ ] Game can be restarted at any time
- [ ] Functional & e2e Tests
- [ ] Add AuthO for user validation
- [ ] Develop API to save games
- [ ] Integrate saved games into UI
- [ ] Develop API to score games
- [ ] Create scores of best games
- [ ] Improve game UI
- [ ] Fix performance of `Medium` & `Hard` difficulties
- [ ] Introduce table of competition between players of the app

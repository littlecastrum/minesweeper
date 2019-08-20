# Minesweepper

Mineswipper implementation on React.js made with hooks, persistance & deployed using Now.js

To run on development:
```bash
  npm install
  npm start
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
- [ ] Functional & e2e Tests
- [ ] Add AuthO for user validation
- [ ] Develop API to save games
- [ ] Create scores of best games
- [ ] Introduce table of competition between players of the app
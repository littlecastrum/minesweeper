import React, { FunctionComponent, ChangeEvent, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Select, OutlinedInput, MenuItem } from '@material-ui/core';
import { useLocalStorage } from './lib/helpers';

import { Game } from './components';

const useStyles = makeStyles({
  '@global body': {
    margin: '20px',
    padding: 0,
    fontFamily: 'sans-serif',
    background: '#f4f4f4'
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

const App: FunctionComponent = () => {
  const classes = useStyles()

  const [difficulty, setDifficulty] = useLocalStorage('difficulty', 8);

  const handleChange = (event: ChangeEvent<{ value: unknown; }>) => {
    setDifficulty(event.target.value)
  }

  return (
    <Container className={classes.root}>
      <Select
        value={difficulty}
        onChange={handleChange}
        input={<OutlinedInput labelWidth={0} name="difficulty" id="outlined-difficulty-simple" />}
      >
        <MenuItem value={8}>Easy</MenuItem>
        <MenuItem value={16}>Medium</MenuItem>
        <MenuItem value={32}>Hard</MenuItem>
      </Select>
      <Game difficulty={difficulty} />
    </Container>
  );
}

export default App;

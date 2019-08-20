import React, { FunctionComponent, ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import { useLocalStorage } from './lib/helpers';

import { Game, Selector } from './components';

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
      <Selector label="Difficulty" handleChange={handleChange} value={difficulty} />
      <Game difficulty={difficulty} />
    </Container>
  );
}

export default App;

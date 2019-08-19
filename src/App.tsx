import React, { FunctionComponent, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';

import { Game } from './components';

const useStyles = makeStyles({
  '@global body': {
    margin: '20px',
    padding: 0,
    fontFamily: 'sans-serif',
    background: '#f4f4f4'
  },
});

const App: FunctionComponent = () => {
  const classes = useStyles()
  const [window, setWindow] = useState({ width: 8, height: 8});
  const [mines, setMines] = useState(8);

  return (
    <Container>
      <Game window={window} mines={mines}/>
    </Container>
  );
}

export default App;

import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';

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
  
  return (
    <Container>
      <div>
        Ready
      </div>
    </Container>
  );
}

export default App;

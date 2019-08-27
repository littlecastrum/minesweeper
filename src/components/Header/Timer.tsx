import React, { FunctionComponent } from 'react';
import { Tooltip, Typography } from '@material-ui/core';

import { useInterval, useLocalStorage } from '../../lib/hooks';

export type timerState = 'START' | 'STOP' | 'RESET';

interface Props {
  state: timerState
}

const Timer: FunctionComponent<Props> = ({ state }) => {
  const [time, setTime] = useLocalStorage('time', 0);

  useInterval(() => {
    if (state === 'START') {
      setTime(time + 1);
    } else if (state === 'RESET') {
      setTime(0);
    }
  }, 1000);

  return (
    <div>
      <Tooltip title="Timer">
        <Typography variant="h4">{time}</Typography>
      </Tooltip>
    </div>
  )
};

export default Timer;

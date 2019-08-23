import React, { FunctionComponent, ChangeEvent } from 'react';
import { FormControl, InputLabel, Select, OutlinedInput, MenuItem } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

interface Props {
  handleChange: (event: ChangeEvent<{ value: unknown; }>) => void;
  value: number;
  label: string;
}

const Selector: FunctionComponent<Props> = ({ handleChange, value, label }) => {
  const classes = useStyles({});
  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    inputLabel.current! && setLabelWidth(inputLabel.current!.offsetWidth);
  }, []);

  return (
    <form className={classes.root} autoComplete="off">
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel} htmlFor="outlined-difficulty-simple">{label}</InputLabel>
        <Select value={value} onChange={handleChange} input={<OutlinedInput labelWidth={labelWidth} name="difficulty" id="outlined-difficulty-simple" />} >
          <MenuItem value={8}>Easy</MenuItem>
          <MenuItem value={16}>Medium</MenuItem>
          {/* <MenuItem value={32}>Hard</MenuItem> */}
        </Select>
      </FormControl>
    </form>
  );
};

export default Selector;

import React, { FunctionComponent, MouseEvent as ReactMouseEvt, ReactElement, Fragment, useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemIcon, ListItemText, Popover, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    }
  })
);

interface Props {
  text: string;
  details?: string;
  icon: ReactElement;
}

const Item: FunctionComponent<Props> = ({ text, details, icon }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const handleClick = (event: ReactMouseEvt<HTMLDivElement, MouseEvent>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Fragment>
      <ListItem button className={classes.nested} onClick={handleClick}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
      <Popover id={id} onClose={handleClose} anchorEl={anchorEl} open={open}>
        <Typography>{text}</Typography>
      </Popover>
    </Fragment>
  )
}

export default Item;

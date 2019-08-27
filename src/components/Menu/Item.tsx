import React, { FunctionComponent, Fragment, ReactElement, useState } from 'react';
import { withStyles, Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      paddingLeft: theme.spacing(4),
    }
  })
);

const HtmlTooltip = withStyles((theme: Theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

interface Props {
  text: string;
  details?: ReactElement;
  icon: ReactElement;
}

const Item: FunctionComponent<Props> = ({ text, details, icon }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);

  return (
    <Fragment>
      <ListItem button className={classes.nested} onClick={handleClick}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <HtmlTooltip title={details}>
          <ListItemText primary={text} />
        </HtmlTooltip>
      </ListItem>
    </Fragment>
  )
}

export default Item;
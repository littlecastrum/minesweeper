import React, { FunctionComponent, Fragment, useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { List, ListSubheader, ListItem, ListItemIcon, ListItemText, Collapse, Divider } from '@material-ui/core';
import {
  FormatListNumbered as FormatListNumberedIcon,
  Save as SaveIcon,
  Inbox as InboxIcon,
  MoveToInbox as OpenInboxIcon,
  ExpandLess,
  ExpandMore
} from '@material-ui/icons';

import Item from './Item';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  }
}));

interface Props {
  data: string[];
}

const Menu: FunctionComponent<Props> = ({ data }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(!open);
  const SubHeader = () => (
    <ListSubheader component="div" id="nested-list-subheader">
      Game Menu
    </ListSubheader>
  );

  return (
    <List component="nav" aria-labelledby="nested-list-subheader" subheader={<SubHeader/>} className={classes.root}>
      <Divider />
      <ListItem button>
        <ListItemIcon>
          <FormatListNumberedIcon />
        </ListItemIcon>
        <ListItemText primary="Best Scores" />
      </ListItem>
      <Divider />
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          { open ? <OpenInboxIcon/> : <InboxIcon />}
        </ListItemIcon>
        <ListItemText primary="Saved Games" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            data.map((text, idx) => (
              <Fragment key={`${text}${idx}`} >
                <Item text={text} icon={<SaveIcon/>}/>
              </Fragment>
            ))
          }
        </List>
      </Collapse>
    </List>
  );
};

export  default Menu;
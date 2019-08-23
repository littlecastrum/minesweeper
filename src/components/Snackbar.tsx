import React, { FunctionComponent, SyntheticEvent, useState } from 'react';
import clsx from 'clsx';
import { Snackbar as MUISnackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { amber, green } from '@material-ui/core/colors';
import {
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  Close as CloseIcon
} from '@material-ui/icons';

import { SnackbarOrigin } from '@material-ui/core/Snackbar';

const iconsMap = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const useStyles = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  margin: {
    margin: theme.spacing(1),
  }
}));

export interface Props {
  origin?: SnackbarOrigin;
  message: string;
  variant: keyof typeof iconsMap;
}

const Snackbar: FunctionComponent<Props> = ({ origin, message, variant }) => {
  const classes = useStyles({});
  const [open, setOpen] = useState(true);

  const handleClose = (event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  }

  const Message = () => (
    <span id="client-snackbar" className={classes.message}>
      <ErrorIcon className={clsx(classes.icon, classes.iconVariant)} />
      {message}
    </span>
  )

  const actions = [(
    <IconButton key="close" aria-label="close" color="inherit" onClick={handleClose}>
      <CloseIcon className={classes.icon} />
    </IconButton>
  )]

  const anchorOrigin = origin || { vertical: 'bottom', horizontal: 'left' }
  return (
    <MUISnackbar anchorOrigin={anchorOrigin} open={open} autoHideDuration={6000} onClose={handleClose}>
      <SnackbarContent
        className={clsx(classes[variant], classes.margin)}
        aria-describedby="client-snackbar"
        message={<Message />}
        action={actions}
      />
    </MUISnackbar>
  )
}

export default Snackbar;
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

const Heading = ({ classes, open, handleDrawerOpen }) => {
  return (
    <AppBar
      position="fixed"
      className={classNames(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={handleDrawerOpen}
          className={classNames(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          Three.js PGS
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

Heading.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  handleDrawerOpen: PropTypes.func,
};

const Header = withStyles(styles, { withTheme: true })(Heading);
export { Header };

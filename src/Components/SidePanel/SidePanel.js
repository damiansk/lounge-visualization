import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Divider, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ModelsStore } from '../../three/store/ModelsStore';
import { ModelsList } from '../ModelsList';
import { JSONExportButton } from '../JSONExportButton';

const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
});

class DrawerPanel extends Component {
  render() {
    const { classes, theme, open, handleDrawerClose, store } = this.props;

    return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <JSONExportButton store={store} />
        <Divider />
        <ModelsList store={store} />
      </Drawer>
    );
  }
}

DrawerPanel.propTypes = {
  store: PropTypes.instanceOf(ModelsStore),
  classes: PropTypes.object,
  theme: PropTypes.object,
  open: PropTypes.bool,
  handleDrawerClose: PropTypes.func,
};

const SidePanel = withStyles(styles, { withTheme: true })(DrawerPanel);

export { SidePanel };

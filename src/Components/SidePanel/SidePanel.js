import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, Divider, IconButton, List } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ModelsList } from '../ModelsList';
import { JSONExportControls } from '../JSONExportControls';
import { JSONImportControls } from '../JSONImportControls';
import { styles } from './styles';

const DrawerPanel = ({
  classes,
  theme,
  open,
  handleDrawerClose,
  handleExportButtonClick,
  loadModelsConfig,
}) => (
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
        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
    </div>
    <Divider />
    <List>
      <JSONExportControls handleExportButtonClick={handleExportButtonClick} />
      <JSONImportControls loadModelsConfig={loadModelsConfig} />
    </List>
    <Divider />
    <ModelsList />
  </Drawer>
);

DrawerPanel.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
  open: PropTypes.bool,
  handleDrawerClose: PropTypes.func,
  handleExportButtonClick: PropTypes.func,
  loadModelsConfig: PropTypes.func,
};

const SidePanel = withStyles(styles, { withTheme: true })(DrawerPanel);

export { SidePanel };

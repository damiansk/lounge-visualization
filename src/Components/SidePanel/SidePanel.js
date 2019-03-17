import React from 'react';
import PropTypes from 'prop-types';
import { Drawer, Divider, IconButton, List } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ModelsStore } from '../../three/store/ModelsStore';
import { ModelsList } from '../ModelsList';
import { JSONExportButton } from '../JSONExportButton';
import { JSONImportControls } from '../JSONImportControls';
import { styles } from './styles';

const DrawerPanel = ({
  classes,
  theme,
  open,
  handleDrawerClose,
  store,
  handleExportButtonClick,
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
      <JSONExportButton handleExportButtonClick={handleExportButtonClick} />
      <JSONImportControls />
    </List>
    <Divider />
    <ModelsList store={store} />
  </Drawer>
);

DrawerPanel.propTypes = {
  store: PropTypes.instanceOf(ModelsStore),
  classes: PropTypes.object,
  theme: PropTypes.object,
  open: PropTypes.bool,
  handleDrawerClose: PropTypes.func,
  handleExportButtonClick: PropTypes.func,
};

const SidePanel = withStyles(styles, { withTheme: true })(DrawerPanel);

export { SidePanel };

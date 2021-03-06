import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

const JSONExportControls = ({ handleExportButtonClick }) => (
  <ListItem>
    <ListItemText primary="Save JSON" />
    <ListItemSecondaryAction>
      <IconButton onClick={handleExportButtonClick}>
        <SaveIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
);

JSONExportControls.propTypes = {
  handleExportButtonClick: PropTypes.func.isRequired,
};

export { JSONExportControls };

import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

const JSONExportButton = ({ handleExportButtonClick }) => (
  <List>
    <ListItem>
      <ListItemText primary="Save JSON" />
      <ListItemSecondaryAction>
        <IconButton onClick={handleExportButtonClick}>
          <SaveIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  </List>
);

JSONExportButton.propTypes = {
  handleExportButtonClick: PropTypes.func.isRequired,
};

export { JSONExportButton };

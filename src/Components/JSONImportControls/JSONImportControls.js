import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Refresh from '@material-ui/icons/Refresh';
import AddBox from '@material-ui/icons/AddBox';
import { FileUploadService } from '../../services';
import { styles } from './styles';

const JSONImportControlsBase = ({ handleImportButtonClick, classes }) => (
  <>
    <ListItem>
      <ListItemText primary="Add JSON" />
      <ListItemSecondaryAction>
        <label htmlFor="json-import-input">
          <input
            className={classes.fileInput}
            type="file"
            id="json-import-input"
            name="json-upload"
            accept=".json"
            onChange={FileUploadService.onFileChange}
          />
          <IconButton
            component="span">
            <AddBox />
          </IconButton>
        </label>
      </ListItemSecondaryAction>
    </ListItem>
    <ListItem>
      <ListItemText primary="Load models" />
      <ListItemSecondaryAction>
        <IconButton
          onClick={() => {
            handleImportButtonClick(FileUploadService.getFile().models);
          }}
        >
          <Refresh />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  </>
);

JSONImportControlsBase.propTypes = {
  classes: PropTypes.object.isRequired,
  handleImportButtonClick: PropTypes.func,
};

const JSONImportControls = withStyles(styles)(JSONImportControlsBase)

export { JSONImportControls };

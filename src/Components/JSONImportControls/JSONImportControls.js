import React from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AddBox from '@material-ui/icons/AddBox';
import { FileUploadService } from '../../services';
import { styles } from './styles';

const JSONImportControlsBase = ({ loadModelsConfig, classes }) => (
  <>
    <ListItem>
      <ListItemText primary="Load JSON" />
      <ListItemSecondaryAction>
        <label htmlFor="json-import-input">
          <input
            className={classes.fileInput}
            type="file"
            id="json-import-input"
            name="json-upload"
            accept=".json"
            onChange={e => {
              FileUploadService.onFileChange(e, loadModelsConfig);
            }}
          />
          <IconButton component="span">
            <AddBox />
          </IconButton>
        </label>
      </ListItemSecondaryAction>
    </ListItem>
  </>
);

JSONImportControlsBase.propTypes = {
  classes: PropTypes.object.isRequired,
  loadModelsConfig: PropTypes.func,
};

const JSONImportControls = withStyles(styles)(JSONImportControlsBase);

export { JSONImportControls };

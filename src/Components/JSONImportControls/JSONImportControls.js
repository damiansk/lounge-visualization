import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Paper } from '@material-ui/core';
import { FileUploadService } from '../../services';

const JSONImportControls = ({ handleImportButtonClick }) => (
  <ListItem>
    <Paper>
      <label>
        Add file
        <input
          type="file"
          name="json-upload"
          accept=".json"
          onChange={FileUploadService.onFileChange}
        />
      </label>
      <button
        onClick={() => {
          handleImportButtonClick(FileUploadService.getFile().models);
        }}
      >
        Load
      </button>
    </Paper>
  </ListItem>
);

JSONImportControls.propTypes = {
  handleImportButtonClick: PropTypes.func,
};

export { JSONImportControls };

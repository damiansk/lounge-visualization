import React from 'react';
import { ListItem, Paper } from '@material-ui/core';
import { FileUploadService } from '../../services';

const JSONImportControls = () => (
  <ListItem>
    <Paper>
      <label>
        Add file
        <input
          type="file"
          name="json-upload"
          onChange={FileUploadService.onFileChange}
        />
      </label>
      <button onClick={console.log}>Load</button>
    </Paper>
  </ListItem>
);

export { JSONImportControls };

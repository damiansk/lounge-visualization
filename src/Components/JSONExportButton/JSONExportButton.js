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
import { ModelsStore } from '../../three/store/ModelsStore';

class JSONExportButton extends React.Component {
  constructor(props) {
    super(props);

    this.createJson = this.createJson.bind(this);
  }

  createJson() {
    this.props.store.createJson();
  }

  render() {
    return (
      <List>
        <ListItem>
          <ListItemText primary="Save JSON" />
          <ListItemSecondaryAction>
            <IconButton onClick={this.createJson}>
              <SaveIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    );
  }
}

JSONExportButton.propTypes = {
  store: PropTypes.instanceOf(ModelsStore),
};

export { JSONExportButton };

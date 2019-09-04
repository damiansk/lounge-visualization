import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Switch,
  TextField,
  Button
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { BaseModel } from '../../../three/primitives';

const DEFAULT_NEW_MODEL = 'Hail to the duke!'

class ModelsListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHovered: false,
      clicked: false,
      newModelName: DEFAULT_NEW_MODEL
    };
  }

  componentDidMount() {
    this.props.model
      .subscribeForChanges$()
      .subscribe(({ isHovered }) => this.setState({ isHovered }));
  }

  onNameChangeInput(event) {
    this.setState({
      ...this.state,
      newModelName: event.target.value
    });
  }

  applyNameChange() {
    this.setState({
      newModelName: DEFAULT_NEW_MODEL,
      clicked: false
    });
    this.props.onApplyChangeName(this.props.model, this.state.newModelName);
  }

  showRenamePanel() {
    this.setState({
      ...this.state,
      clicked: true
    });
  }

  render() {
    const { index, model, onRemove } = this.props;

    return (
      <div>
        <ListItem
          key={index}
          button
          onClick={this.showRenamePanel.bind(this)}
          onMouseOver={() => model.setHover(true)}
          onMouseOut={() => model.setHover(false)}
          selected={this.state.isHovered}
        >
          <ListItemText primary={`${index + 1}) ${model.getName()}`} />
          <ListItemSecondaryAction>
            {model.checkbox ? (
              <Switch
                defaultChecked={model.checkbox.initialValue}
                onChange={event => model.checkbox.callback(event.target.checked)}
              />
            ) : null}
            <IconButton aria-label="Delete" onClick={() => onRemove(model)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        {this.state.clicked && <div>
          <TextField fullWidth={true} variant="filled" value={this.state.newModelName} label="Rename the item" onChange={this.onNameChangeInput.bind(this)} />
          <Button variant="contained" color="secondary" size="small" onClick={this.applyNameChange.bind(this)}>OK</Button>
        </div>}
      </div>
    );
  }
}

ModelsListItem.propTypes = {
  index: PropTypes.number.isRequired,
  model: PropTypes.instanceOf(BaseModel).isRequired,
  onRemove: PropTypes.func.isRequired,
  onApplyChangeName: PropTypes.func.isRequired
};

export { ModelsListItem };

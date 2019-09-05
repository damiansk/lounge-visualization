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
import EditIcon from '@material-ui/icons/Edit';
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

  toggleRenamePanel() {
    this.setState({
      ...this.state,
      clicked: !this.state.clicked
    });
  }

  render() {
    const { index, model, onRemove } = this.props;

    return (
      <>
        <ListItem
          key={index}
          button
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
            <IconButton aria-label="Edit" onClick={this.toggleRenamePanel.bind(this)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="Delete" onClick={() => onRemove(model)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        {this.state.clicked && <>
          <TextField fullWidth={true} variant="filled" value={this.state.newModelName} label="Rename the item" onChange={this.onNameChangeInput.bind(this)} />
          <Button variant="contained" color="secondary" size="small" onClick={this.applyNameChange.bind(this)}>OK</Button>
        </>}
      </>
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

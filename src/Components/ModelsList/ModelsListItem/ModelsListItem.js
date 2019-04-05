import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Switch,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { BaseModel } from '../../../three/primitives';

class ModelsListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHovered: false
    };
  }

  componentDidMount() {
    this.props.model
      .subscribeForChanges$()
      .subscribe(({ isHovered }) => this.setState({ isHovered }));
  }

  render() {
    const { index, model, onRemove } = this.props;

    return (
      <ListItem
        key={index}
        button
        onMouseOver={() => model.setHover(true)}
        onMouseOut={() => model.setHover(false)}
        selected={this.state.isHovered}
      >
        <ListItemText primary={`${index}) ${model.getName()}`} />
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
    );
  }
}

ModelsListItem.propTypes = {
  index: PropTypes.number.isRequired,
  model: PropTypes.instanceOf(BaseModel).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export { ModelsListItem };

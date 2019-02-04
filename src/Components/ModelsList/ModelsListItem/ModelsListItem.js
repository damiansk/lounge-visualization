import React, { Component } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Switch,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

class ModelsListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    props.model
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
          {/* {model.userData.checkbox ? */}
          <Switch
          // defaultChecked={model.userData.checkbox.initialStatus}
          // onChange={model.userData.checkbox.callback}
          />
          {/* : null} */}
          <IconButton aria-label="Delete" onClick={() => onRemove(model)}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export { ModelsListItem };

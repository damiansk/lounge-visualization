import React, { Component, useCallback, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Switch,
  TextField,
  Button,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { BaseModel } from '../../../three/primitives';

const DEFAULT_NEW_MODEL = 'Hail to the duke!';

const useModelReactiveHover = model => {
  // Getting static `isHovered` value to init the state
  const [isHovered, setIsHovered] = useState(model.isHovered);

  useEffect(() => {
    const subscription = model
      // TODO Change string to Symbol
      .getAttribute$('isHovered')
      .subscribe(setIsHovered);

    return () => subscription.unsubscribe();
  }, [model]);

  const onMouseOver = useCallback(() => {
    // TODO Change string to Symbol
    model.setAttribute$('isHovered', true);
  }, [model]);

  const onMouseOut = useCallback(() => {
    // TODO Change string to Symbol
    model.setAttribute$('isHovered', false);
  }, [model]);

  return [isHovered, onMouseOver, onMouseOut];
}

const Item = ({ index, model, onRemove, onApplyChangeName }) => {
  const [isOpen, setIsOpen] = useState();
  const [newModelName, setNewModelName] = useState(DEFAULT_NEW_MODEL);
  const [isHovered, handleOnMouseOver, handleOnMouseOut] = useModelReactiveHover(model);

  const handleRemove = useCallback(
    () => {
      onRemove(model);
    },
    [onRemove, model]
  );

  const onNameChangeInput = event => {
    setNewModelName(event.target.value);
  };

  const applyNameChange = () => {
    setIsOpen(false);
    setNewModelName(DEFAULT_NEW_MODEL);
    onApplyChangeName(model, newModelName);
  };

  const toggleRenamePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ListItem
        key={index}
        button
        onMouseOver={handleOnMouseOver}
        onMouseOut={handleOnMouseOut}
        selected={isHovered}
      >
        <ListItemText primary={`${index + 1}) ${model.getName()}`} />
        <ListItemSecondaryAction>
          {model.checkbox ? (
            <Switch
              defaultChecked={model.checkbox.initialValue}
              onChange={event => model.checkbox.callback(event.target.checked)}
            />
          ) : null}
          <IconButton aria-label="Edit" onClick={toggleRenamePanel}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="Delete" onClick={handleRemove}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      {isOpen && (
        <>
          <TextField
            fullWidth
            variant="filled"
            value={newModelName}
            label="Rename the item"
            onChange={onNameChangeInput}
          />
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={applyNameChange}
          >
            OK
          </Button>
        </>
      )}
    </>
  );
};

Item.propTypes = {
  index: PropTypes.number.isRequired,
  model: PropTypes.instanceOf(BaseModel).isRequired,
  onRemove: PropTypes.func.isRequired,
  onApplyChangeName: PropTypes.func.isRequired,
};

export { Item as ModelsListItem };

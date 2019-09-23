import React, { useCallback, useEffect, useState } from 'react';
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

const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(event => setValue(event.target.value), []);

  return [value, handleChange];
};

const useModelAttribute = (model, attributeName) => {
  // TODO Init state from "attributes" or create something more independent from model structure?
  const [attribute, setAttribute] = useState(model.attributes[attributeName]);

  useEffect(
    () => {
      const subscription = model
        .getAttribute$(attributeName)
        .subscribe(setAttribute);

      return () => subscription.unsubscribe();
    },
    [attributeName, model]
  );

  const setModelAttribute = useCallback(
    value => model.setAttribute$(attributeName, value),
    [attributeName, model]
  );

  return [attribute, setModelAttribute];
};

const Item = ({ index, model, onRemove }) => {
  const [isHovered, setIsHovered] = useModelAttribute(model, 'isHovered');
  const [name, setName] = useModelAttribute(model, 'name');
  const [nameInputValue, handleNameInputValueChange] = useInput(name);
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseOver = useCallback(() => setIsHovered(true), [setIsHovered]);
  const handleMouseOut = useCallback(() => setIsHovered(false), [setIsHovered]);
  const handleSaveModelName = useCallback(
    () => {
      setName(nameInputValue);
      setIsOpen(false);
    },
    [setName, nameInputValue]
  );
  const handleRemoveModel = useCallback(
    () => {
      onRemove(model);
    },
    [onRemove, model]
  );

  const toggleRenamePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ListItem
        key={index}
        button
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        selected={isHovered}
      >
        <ListItemText primary={`${index + 1}) ${name}`} />
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
          <IconButton aria-label="Delete" onClick={handleRemoveModel}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      {isOpen && (
        <>
          <TextField
            fullWidth
            variant="filled"
            value={nameInputValue}
            label="Rename the item"
            onChange={handleNameInputValueChange}
          />
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={handleSaveModelName}
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

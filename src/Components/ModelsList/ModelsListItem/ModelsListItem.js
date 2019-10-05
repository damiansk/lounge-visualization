import React, { useCallback, useState } from 'react';
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
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { useModelAttribute, useInput } from '../../../hooks';
import { BaseModel } from '../../../three/primitives';

const Item = ({ index, model, onRemove }) => {
  const [isHovered, setIsHovered] = useModelAttribute(model, 'isHovered');
  const [isInteractive, setIsInteractive] = useModelAttribute(
    model,
    'isInteractive'
  );
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
  const handleInteractiveToggle = useCallback(
    () => {
      setIsInteractive(!isInteractive);
    },
    [setIsInteractive, isInteractive]
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
          {/* TODO Make it reactive (for now there is only the light but in the future who knows...) */}
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
          <IconButton aria-label="Disable" onClick={handleInteractiveToggle}>
            {isInteractive ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
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
};

export { Item as ModelsListItem };

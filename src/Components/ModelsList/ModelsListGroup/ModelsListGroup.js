import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { ModelsListItem } from '../ModelsListItem/ModelsListItem';

const ModelsListGroup = ({ modelGroup, modelType, onRemove }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ListItem button onClick={() => setIsOpen(!isOpen)}>
        <ListItemText primary={modelType} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {modelGroup.map((model, index) => (
            <ModelsListItem
              key={index}
              index={index}
              model={model}
              onRemove={onRemove}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export { ModelsListGroup };

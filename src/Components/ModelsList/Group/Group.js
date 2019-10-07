import React, { useState } from 'react';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Item } from '../Item/Item';

const Group = ({ modelGroup, modelType, onRemove }) => {
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
            <Item key={index} index={index} model={model} onRemove={onRemove} />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export { Group };

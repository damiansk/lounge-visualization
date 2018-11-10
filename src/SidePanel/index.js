import React from 'react';
import { Drawer, Divider, List, ListItem, ListItemText } from '@material-ui/core';

const SidePanel = () => (
    <Drawer
        variant="permanent"
    >
        <div/>
        <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
                <ListItemText primary={text} />
            </ListItem>
            ))}
        </List>
        <Divider />
        <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
                <ListItemText primary={text} />
            </ListItem>
            ))}
        </List>
    </Drawer>
)

export { SidePanel };
import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { ModelsStore } from '../../ModelsStore';
import { ModelsListItem } from './ModelsListItem/ModelsListItem';

class ModelsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      models: props.store.getModels(),
    };

    this.createJson = this.createJson.bind(this);
  }

  componentDidMount() {
    this.subscription = this.props.store
      .getUpdateEvent$()
      .subscribe(models => this.setState({ models }));
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  createJson() {
    this.props.store.createJson();
  }

  render() {
    const modelGroups = this.state.models.reduce((acc, model) => {
      if (!acc[model.name]) {
        acc[model.name] = [];
      }
      
      acc[model.name].push(model);
      return acc;
    }, {});
    // console.log(modelGroups)

    return (
      <>
        <List>
          <ListItem>
            <ListItemText primary="JSON" />
            <ListItemSecondaryAction>
              <IconButton onClick={this.createJson}>
                <SaveIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <Divider />
        {Object.keys(modelGroups).map((modelName, i) => (
          <List key={i} component="div" disablePadding>
            {console.log(modelName)}
            {modelGroups[modelName].map((model, index) => (
              <ModelsListItem
                key={index}
                index={index}
                model={model}
                onRemove={this.props.store.remove}
              />
            ))}
          </List>
        ))}
      </>
    );
  }
}

ModelsList.propTypes = {
  store: PropTypes.instanceOf(ModelsStore),
};

export { ModelsList };

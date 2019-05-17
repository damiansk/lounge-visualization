import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { ModelsStore } from '../../three/store/ModelsStore';
import { ModelsListItem } from './ModelsListItem/ModelsListItem';

class ModelsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      models: props.store.getModels(),
      open: false
    };
  }

  componentDidMount() {
    this.subscription = this.props.store
      .getUpdateEvent$()
      .subscribe(models => this.setState({ models }));
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const modelGroups = this.state.models.reduce((acc, model) => {
      const modelName = model.getName();
      if (!acc[modelName]) {
        acc[modelName] = [];
      }

      acc[modelName].push(model);
      return acc;
    }, {});

    return (
      <>
        {Object.keys(modelGroups).map((modelName, i) => (
          <>
            <ListItem button onClick={this.handleClick}>
              <ListItemText primary={modelName} />
              {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
              <List key={i} component="div" disablePadding>
                {modelGroups[modelName].map((model, index) => (
                  <ModelsListItem
                    key={index}
                    index={index}
                    model={model}
                    onRemove={this.props.store.remove}
                  />
                ))}
              </List>
            </Collapse>
          </>
        ))}
      </>
    );
  }
}

ModelsList.propTypes = {
  store: PropTypes.instanceOf(ModelsStore),
};

export { ModelsList };

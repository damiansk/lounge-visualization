import React from 'react';
import PropTypes from 'prop-types';
import { List } from '@material-ui/core';
import { ModelsStore } from '../../three/store/ModelsStore';
import { ModelsListItem } from './ModelsListItem/ModelsListItem';

class ModelsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      models: props.store.getModels(),
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

  render() {
    const modelGroups = this.state.models.reduce((acc, model) => {
      if (!acc[model.name]) {
        acc[model.name] = [];
      }

      acc[model.name].push(model);
      return acc;
    }, {});

    return (
      <>
        {Object.keys(modelGroups).map((modelName, i) => (
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
        ))}
      </>
    );
  }
}

ModelsList.propTypes = {
  store: PropTypes.instanceOf(ModelsStore),
};

export { ModelsList };

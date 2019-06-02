import React from 'react';
import PropTypes from 'prop-types';
import { ModelsStore } from '../../three/store/ModelsStore';
import { ModelsListGroup } from './ModelsListGroup/ModelsListGroup';
import { StoreContext } from '../../storeContext';

class ModelsList extends React.Component {
  state = { models: this.context.getModels() };

  componentDidMount() {
    this.subscription = this.context
      .getUpdateEvent$()
      .subscribe(models => this.setState({ models }));
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

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
        {Object.keys(modelGroups).map((modelName, i) => {
          return (
            <ModelsListGroup
              key={modelName}
              modelGroup={modelGroups[modelName]}
              modelName={modelName}
              onRemove={this.context.remove}
            />
          );
        })}
      </>
    );
  }
}

ModelsList.propTypes = {
  store: PropTypes.instanceOf(ModelsStore),
};

ModelsList.contextType = StoreContext;

export { ModelsList };

import React from 'react';
import PropTypes from 'prop-types';
import { ModelsStore } from '../../three/store/ModelsStore';
import { ModelsListGroup } from './ModelsListGroup/ModelsListGroup';

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
              onRemove={this.props.store.remove}
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

export { ModelsList };

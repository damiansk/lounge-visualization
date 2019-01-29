import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Switch, Divider } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import { ModelsStore } from '../../ModelsStore';

class ModelsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      models: props.store.getModels()
    };
  }
  
  componentDidMount() {
    this.subscription = this.props.store
      .modelsUpdate$()
      .subscribe(({ models }) => this.setState({ models }));
  }

  componentWillUnmount() {
    this.subscription.unsubscribe();
  }

  render() {
    const modelGroups = this.state.models.reduce((acc, model) => {
      if(!acc[model.name]) {
        acc[model.name] = [];
      }

      acc[model.name].push(model);      
      return acc;
    }, {});

    return (
      <>
        <List>
          <ListItem>
            <ListItemText
              primary="JSON"
            />
            <ListItemSecondaryAction>
              <IconButton onClick={this.createJson}>
                <SaveIcon/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <Divider/>
        {
          Object.keys(modelGroups)
          .map((modelName, i) => (
            <List key={i} component="div" disablePadding>
              {
                modelGroups[modelName].map((model, index) => (
                  <ListItem
                    key={index}
                    button
                    // onMouseOver={() => this.hoveHandler(model)}
                    // onMouseOut={() => this.blurHandler(model)}
                  >
                    <ListItemText
                      primary={`${index}) Some label`}
                    />
                    <ListItemSecondaryAction>
                      {/* {model.userData.checkbox ? */}
                        <Switch
                          // defaultChecked={model.userData.checkbox.initialStatus}
                          // onChange={model.userData.checkbox.callback}
                        />
                      {/* : null} */}
                      <IconButton
                        aria-label="Delete"
                        // onClick={() => ModelsSto                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         re.removeModel(model)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              }
            </List>
          ))
        }
      </>
    )
  }
}


ModelsList.propTypes = {
  store: PropTypes.instanceOf(ModelsStore)
}

export { ModelsList };
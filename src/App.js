import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThreeContainer } from './Components/ThreeContainer';
import { Header } from './Components/Header';
import { SidePanel } from './Components/SidePanel';
import { exportToJsonFile } from './utils';
import { styles } from './styles';
import { models as modelsConfig } from './three/config/models.json';
import { StoreContext } from './storeContext';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      modelsConfig,
    };

    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleExportButtonClick = this.handleExportButtonClick.bind(this);
    this.loadModelsConfig = this.loadModelsConfig.bind(this);
  }

  handleDrawerOpen() {
    this.setState({ open: true });
  }

  handleDrawerClose() {
    this.setState({ open: false });
  }

  handleExportButtonClick() {
    exportToJsonFile('models', this.context.createJson());
  }

  loadModelsConfig(config) {
    this.setState({ modelsConfig: config });
  }

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Header
          theme={theme}
          open={open}
          handleDrawerOpen={this.handleDrawerOpen}
        />
          <SidePanel
            handleDrawerClose={this.handleDrawerClose}
            open={open}
            handleExportButtonClick={this.handleExportButtonClick}
            loadModelsConfig={this.loadModelsConfig}
          />
          <main
            className={classNames(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.appBarSpacer} />
            <ThreeContainer
              store={this.context}
              modelsConfig={this.state.modelsConfig}
            />
          </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
};

App.contextType = StoreContext;

export default withStyles(styles, { withTheme: true })(App);

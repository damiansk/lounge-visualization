import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThreeContainer } from './Components/ThreeContainer';
import { Header } from './Components/Header';
import { SidePanel } from './Components/SidePanel';
import { ModelsStore } from './three/store/ModelsStore';
import { styles } from './styles';

const exportToJsonFile = jsonData => {
  const dataStr = JSON.stringify(jsonData);
  const dataUri = `data:application/json;charset=utf-8, ${encodeURIComponent(
    dataStr
  )}`;
  const exportFileDefaultName = 'models.json';
  const linkElement = document.createElement('a');

  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.modelsStore = new ModelsStore();

    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleExportButtonClick = this.handleExportButtonClick.bind(this);
  }

  handleDrawerOpen() {
    this.setState({ open: true });
  }

  handleDrawerClose() {
    this.setState({ open: false });
  }

  handleExportButtonClick() {
    exportToJsonFile(this.modelsStore.createJson());
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
          store={this.modelsStore}
          handleExportButtonClick={this.handleExportButtonClick}
        />
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.appBarSpacer} />
          <ThreeContainer store={this.modelsStore} />
        </main>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(App);

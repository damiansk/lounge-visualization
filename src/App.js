import React, { Component } from 'react';
import { Header } from './Header';
import { ThreeContainer } from './ThreeContainer';
import { SidePanel } from './SidePanel';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <ThreeContainer />
        <SidePanel />
      </>
    );
  }
}

export default App;

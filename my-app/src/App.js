import React, { Component } from 'react';
import stickies from './Stickies';
import Canvas from './Canvas';
import Composer from './Composer';
import './App.css';

class App extends Component {
  //-----------------------------------------------------------------------------------------------
  // constructor
  //-----------------------------------------------------------------------------------------------
  constructor(props) {
    super(props);
    this.stickies = stickies.getStickies();
    console.log(JSON.stringify(this.stickies, null, 4));
  }

  //-----------------------------------------------------------------------------------------------
  // render
  //-----------------------------------------------------------------------------------------------
  render() {
    return (
      <div className="App">
        <Composer/>
        <Canvas/>
      </div>
    );
  };
}

export default App;

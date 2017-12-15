require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

// let yeomanImage = require('../images/yeoman.png');

class Washer extends React.Component {
  constructor() {
    super();
    this.state = {
      // 0 - not being used
      // 1 - someone else is using it
      // 2 - you are using it
      user: 0
    };
    this.handleClickOn = this.handleClickOn.bind(this);
    // this.handleClickOff = this.handleClickOff.bind(this);
  }

  handleClickOn(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.state.user == 1) {
      alert('It is being used.');
      return;
    }
    else if (this.state.user == 2) {
      alert('You\'ve already turn the washer on.');
      return;
    }
    alert('On');
    this.setState({
      user: 2
    });
    return;
  }

  // handleClickOff(e) {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   if (this.state.user == 0) {
  //     alert('You can\'t turn it off when it is not washing');
  //     return;
  //   }
  //   else if (this.state.user == 1) {
  //     alert('You shouldn\'t do that.');
  //     return;
  //   }
  //   alert('Off');
  // }

  render() {
    return (
      <div className="Washer">
        Washer No.{this.props.order}
        <button className="On" onClick={this.handleClickOn} >On</button>
        {/* <button className="Off" onClick={this.handleClickOff}>Off</button> */}
      </div>
    );
  }
}

class List extends React.Component {
  render() {
    return (
      <div className="List">
        <Washer order={0}/>
        <Washer order={1}/>
        <Washer order={2}/>
      </div>
    );
  }
}

class AppComponent extends React.Component {
  render() {
    return (
      // <div className="index">
      //   <img src={yeomanImage} alt="Yeoman Generator" />
      //   <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
      // </div>
      <List />
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

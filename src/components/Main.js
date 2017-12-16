require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

// let yeomanImage = require('../images/yeoman.png');
let timeArray = [5, 45, 45];
let users = [0, 0, 0];

class Washer extends React.Component {
  constructor() {
    super();
    this.state = {
      // 0 - not being used
      // 1 - someone else is using it
      // 2 - you are using it
      user: 0,
      text: 'Not being used.',
      time: 0
    };
    this.handleClickOn = this.handleClickOn.bind(this);
    this.timeOn = this.timeOn.bind(this);
  }

  // componentDidMount() {
  //   this.setState({
  //     user: users[this.props.order]
  //   });
  // }

  timeOn() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    let mins = timeArray[this.props.order];
    let exp = 1000;
    this.timer = setTimeout(() => {
      alert('SB');
    }, exp * mins);
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
    this.setState({
      user: 2,
      text: 'Being used.'
    },
      () => {
        this.timeOn();
      }
    );
    return;
  }

  render() {
    return (
      <div className="Washer">
        Washer No.{this.props.order}
        <p>
          {this.state.text}
          <button className="On" onClick={this.handleClickOn} >On</button>
        </p>
      </div>
    );
  }
}

class List extends React.Component {
  render() {
    return (
      <div className="List">
        <Washer order={0} />
        <Washer order={1} />
        <Washer order={2} />
      </div>
    );
  }
}

class AppComponent extends React.Component {
  render() {
    return (
      <List />
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;

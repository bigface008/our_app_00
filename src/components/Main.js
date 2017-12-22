require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

import Washer from '../components/Washer'
import Group_Selector from '../components/Group_Selector'
import { WASHER_GROUP } from '../components/Group_Selector'


class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      selected_group: 0,
      current_user:'admin'
    };
    this.washers = [];

    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.handleClickOn = this.handleClickOn.bind(this);
    this.handleClickGet = this.handleClickGet.bind(this);
    // this.tick = this.tick.bind(this);

    // Init the washers, store all washers in this component
    for (let i = 0; i < WASHER_GROUP.length; i++) {
      let tmp = [];
      for (let j = 0; j < WASHER_GROUP[i]; j++) {
        let washer = {
          mode: 0,
          user: '',
          text: 'init',
          time: 0,
          group: i,
          id: j
        };
        tmp.push(washer);
      }
      this.washers.push(tmp);
    }
    console.log(this.washers);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleGroupChange(group) {
    this.setState({ selected_group: group });
  }

  handleClickOn(e) {
    alert('click on', e.group, e.id);
    switch (this.washers[e.group][e.id].mode) {
      case 0:
        this.washers[e.group][e.id].mode = 1;
        this.washers[e.group][e.id].time = 45;
        this.washers[e.group][e.id].text = 'washing';
        console.log(this.washers);
        break;
      case 1:
        alert('It is being used.');
        break;
      case 2:
        alert('You\'ve already turn the washer on.');
        break;
      default:
        alert('Wrong mode code!');
    }
  }

  handleClickGet(e) {
    alert('click get');
    if (this.washers[e.group][e.id].mode == 2) {
      this.washers[e.group][e.id].mode = 0;
      this.washers[e.group][e.id].text = 'init';
    }
    else {
      alert('error');
    }
  }

  tick() {
    this.washers.forEach(i => {
      i.forEach(w => {
        if (w.mode == 1) {
          w.time--;
          if (w.time == 0) w.mode = 2;
        }
      });
    });
    // this.forceUpdate();
    this.setState((prev) => {
      selected_group:prev.selected_group
    });
  }

  render() {
    let tmp = [];
    this.washers[this.state.selected_group].forEach(i => {
      const w = (
        <Washer key={i.group * 100 + i.id + i.time * 1000} mode={i.mode}
          user={i.user} time={i.time} group={this.state.selected_group} id={i.id} text={i.text}
          onClickOn={this.handleClickOn} onClickGet={this.handleClickGet} />
      );
      tmp.push(w);
    });

    return (
      <div>
        <Group_Selector onGroupChange={this.handleGroupChange} />
        <p>User:{this.state.current_user}</p>
        <div className="List">
          {tmp}
        </div>
      </div>
    );
  }
}


AppComponent.defaultProps = {
};

export default AppComponent;


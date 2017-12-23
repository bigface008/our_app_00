require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
// import Affix from 'react-overlays/lib/Affix'

import Washer from '../components/Washer'
import Group_Selector from '../components/Group_Selector'
import { WASHER_GROUP } from '../components/Group_Selector'
import Login from '../components/Login'

const WASHING_TIME = 5;
const UNIT = 1000;

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      selected_group: 0,
      current_user: 'admin',
      washers: ((arr) => {
        // Init the washers, store all washers in this component
        let temp_arr = [];
        for (let i = 0; i < arr.length; i++) {
          let tmp = [];
          for (let j = 0; j < arr[i]; j++) {
            let washer = {
              /**
               * 0 - Not being used
               * 1 - Being used
               * 2 - Clothes
               */
              mode: 0,
              user: '',
              text: 'init',
              time: 0,
              group: i,
              id: j
            };
            tmp.push(washer);
          }
          temp_arr.push(tmp);
        }
        return temp_arr;
      })(WASHER_GROUP)
    };

    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleClickOn = this.handleClickOn.bind(this);
    this.handleClickGet = this.handleClickGet.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      UNIT
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleUserChange(name) {
    this.setState({
      current_user: name
    });
  }

  handleGroupChange(group) {
    this.setState({ selected_group: group });
  }

  handleClickOn(e) {
    switch (this.state.washers[e.group][e.id].mode) {
      case 0:
        {
          let tmp = this.state.washers;
          tmp[e.group][e.id].mode = 1;
          tmp[e.group][e.id].time = WASHING_TIME;
          tmp[e.group][e.id].user = this.state.current_user;
          tmp[e.group][e.id].text = 'washing';
          this.setState({
            washers: tmp
          });
          return;
        }
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
    switch (this.state.washers[e.group][e.id].mode) {
      case 2:
        {
          let tmp = this.state.washers;
          tmp[e.group][e.id].mode = 0;
          tmp[e.group][e.id].text = 'init';
          this.setState({
            washers: tmp
          });
          return;
        }
      case 1:
        alert('You can\'t take the clothes now.');
        return;
      case 0:
        alert('No clothes in the washer');
        return;
      default:
        alert('Wrong mode code!');
    }
  }

  tick() {
    let tmp = this.state.washers;
    tmp.forEach(i => {
      i.forEach(w => {
        if (w.mode == 1) {
          w.time--;
          if (w.time == 0) w.mode = 2;
        }
      });
    });
    this.setState((prev) => {
      washers: tmp
      selected_group: prev.selected_group
    });
  }

  render() {
    let tmp = [];
    this.state.washers[this.state.selected_group].forEach(i => {
      const w = (
        <Washer key={i.group * 100 + i.id + i.time * 1000} mode={i.mode}
          user={i.user} time={i.time} group={this.state.selected_group} id={i.id} text={i.text}
          onClickOn={this.handleClickOn} onClickGet={this.handleClickGet} />
      );
      tmp.push(w);
    });

    return (
      <div>
        <Grid fluid={true}>
          <Row>
            <Col xs={3} md={3} className="left">
              <h1 className="affix-title">洗衣机</h1>
              <br /><br /><br /><br /><br />
              <Login defaultUser="admin" onUserChange={this.handleUserChange} /><br />
              <Group_Selector onGroupChange={this.handleGroupChange} />
            </Col>

            <Col xs={1} md={1} />

            <Col xs={6} md={6}>
              <br /><br />
              {tmp}
            </Col>
          </Row>
          <Row />
        </Grid>
      </div>
    );
  }
}


AppComponent.defaultProps = {
};

export default AppComponent;


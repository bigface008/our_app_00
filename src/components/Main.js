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

const WASHING_TIME = 3;
const UNIT = 1000;

class AppComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      selected_group: 0,
      current_user: 'admin'
    };
    this.washers = [];

    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
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
    // console.log(this.washers);
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

  /**
   * Handle click for the Washers' 'On' button.
   * @param {*Event for click} e
   */
  handleClickOn(e) {
    e.stopPropagation();
    e.preventDefault();
    switch (this.washers[e.group][e.id].mode) {
      case 0:
        this.washers[e.group][e.id].mode = 1;
        this.washers[e.group][e.id].time = WASHING_TIME;
        this.washers[e.group][e.id].user = this.state.current_user;
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

  /**
   * Handle click for the Washers' '
   * @param {*Event for click} e
   */
  handleClickGet(e) {
    console.log(this.washers[0][0]);
    if (this.washers[e.group][e.id].mode == 2) {
      if (this.washers[e.group][e.id].user == this.state.current_user) {
        this.washers[e.group][e.id].mode = 0;
        this.washers[e.group][e.id].text = 'init';
      }
      else {
        alert('This is not yours');
      }
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
      selected_group: prev.selected_group
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


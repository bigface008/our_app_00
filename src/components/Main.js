require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'

import Washer from '../components/Washer'
import Group_Selector from '../components/Group_Selector'
import { WASHER_GROUP } from '../components/Group_Selector'
import Login from '../components/Login'

const WASHING_TIME = 60 * 45 * 100 + 100;
const UNIT = 1;
const INFO_LIST = ['init', 'washing', 'finish','repaired'];

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
               * 3 - can't work;
               */
              mode: 0,
              user: '',
              text: INFO_LIST[0],
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
    this.handleClickRepair = this.handleClickRepair.bind(this);
    this.tick = this.tick.bind(this);
  }

  /**
   * @function componentDidMount
   * Load a clock that renew the state of user and all washers per UNIT.
   */
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      UNIT
    );
  }

  /**
   * @function componentWillUnmount
   * Clean the clock.
   */
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  /**
   * @function handleUserChange
   * @param {*Name of user} name
   * Set the current user. This function will be called by the
   * Login component.
   */
  handleUserChange(name) {
    this.setState({
      current_user: name
    });
  }

  /**
   * @function handleGroupChange
   * @param {*Index of selected group} group
   * Set the current group. This function will be called by the
   * Group_Selector component.
   */
  handleGroupChange(group) {
    this.setState({ selected_group: group });
  }

  /**
   * @function handleClickOn
   * @param {*Event for click} e
   * Handle Click for Button 'On'.
   * -----------------------------
   * if the washer is not working:
   *     Turn it on & set state.
   * if the washer is working:
   *     Warn and return.
   * if the washer has clothes in it:
   *     Warn and return.
   */
  handleClickOn(e) {
    switch (this.state.washers[e.group][e.id].mode) {
      case 0:
        {
          let tmp = this.state.washers;
          tmp[e.group][e.id].mode = 1;
          tmp[e.group][e.id].time = WASHING_TIME;
          tmp[e.group][e.id].user = this.state.current_user;
          this.setState({
            washers: tmp
          });
          return;
        }
      case 1:
        alert('It is being used.');
        break;
      case 2:
        alert('You should take out the clothes.');
        break;
      case 3:
        alert('This washer can\'t work! Don\'t use it.');
        break;
      default:
        alert('Wrong mode code!');
    }
  }

  /**
   * @function handleClickGet
   * @param {*Event for click} e
   * Handle Click for Button 'Get Clothes'.
   * --------------------------------------
   * if the washer has clothes in it:
   *     Set state and return.
   * if the washer is working:
   *     Warn and return.
   * if the washer is not working and has no clothes:
   *     Warn and return.
   */
  handleClickGet(e) {
    switch (this.state.washers[e.group][e.id].mode) {
      case 2:
        {
          let tmp = this.state.washers;
          tmp[e.group][e.id].mode = 0;
          this.forceUpdate();
          this.setState({
            washers: tmp
          });
          break;
        }
      case 1:
        alert('You can\'t take the clothes now.');
        break;
      case 0:
        alert('No clothes in the washer');
        break;
      case 3:
        alert('This washer can\'t work! Don\'t use it.');
        break;
      default:
        alert('Wrong mode code!');
    }
  }

  handleClickRepair(e) {
    switch (this.state.washers[e.group][e.id].mode) {
      case 0:
      {
        let tmp = this.state.washers;
        tmp[e.group][e.id].mode = 3;
        tmp[e.group][e.id].time = 0;
        tmp[e.group][e.id].user = '';
        this.forceUpdate();
        this.setState({
          washers: tmp
        });
        alert('Think for your misreport, we will repair it soon.');
        break;
      }
      case 1:
      {
        let tmp = this.state.washers;
        tmp[e.group][e.id].mode = 3;
        tmp[e.group][e.id].time = 0;
        tmp[e.group][e.id].user = '';
        this.forceUpdate();
        this.setState({
          washers: tmp
        });
        alert('Think for your misreport, we will repair it soon.');
        break;
      }
      case 2:
      {
        let tmp = this.state.washers;
        tmp[e.group][e.id].mode = 3;
        tmp[e.group][e.id].time = 0;
        tmp[e.group][e.id].user = '';
        this.forceUpdate();
        this.setState({
          washers: tmp
        });
        alert('Think for your misreport, we will repair it soon.');
        break;
      }
      case 3:
        alert('It has been already misreported. ');
        break;
      default:
        alert('Wrong mode code!');
    }
  }
  /**
   * @function tick
   * Renew the state of washers.
   * ---------------------------
   * if the washer is working:
   *     time--;
   *     if time == 0:
   *         mode = 2;
   * Renew the text at the same time.
   */
  tick() {
    let tmp = this.state.washers;
    tmp.forEach(i => {
      i.forEach(w => {
        if (w.mode == 1) {
          w.time--;
          if (w.time == 0) w.mode = 2;
        }
        w.text = INFO_LIST[w.mode];
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
        <Washer
          key={i.group * 100 + i.id + i.time * 1000}
          mode={i.mode}
          user={i.user}
          time={i.time}
          group={this.state.selected_group}
          id={i.id}
          text={i.text}
          onClickOn={this.handleClickOn}
          onClickGet={this.handleClickGet}
          onClickRepair ={this.handleClickRepair}
        />
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


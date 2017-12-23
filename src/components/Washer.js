require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

import Button from 'react-bootstrap/lib/Button'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
// import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Panel from 'react-bootstrap/lib/Panel'
import Grid from 'react-bootstrap/lib/Grid'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'

const MINTUES = 5;
const UNIT = 1000;

class Washer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 0 - not being used && no clothes in washer
      // 1 - someone else is using it
      // 2 - you are using it
      // 3 - not being used && clothes in washer
      mode: 0,
      // user: '',
      text: 'Not being used',
      time: 0,
      order: props.order
    };
    this.handleClickOn = this.handleClickOn.bind(this);
    this.handelClickGetClothes = this.handelClickGetClothes.bind(this);
    this.timeOn = this.timeOn.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentWillUnmount() {
    if (this.timerID) clearInterval(this.timerID);
  }

  /**
   * Handle the click for button 'On'.
   * @param {*Event for click} e
   * Check wrong action and start timeOn().
   */
  handleClickOn(e) {
    e.stopPropagation();
    e.preventDefault();
    switch (this.state.mode) {
      case 0:
        this.setState({
          mode: 2,
          text: 'Being used.',
          time: MINTUES
        },
          () => {
            this.timeOn();
          }
        );
        return;
      case 1:
        alert('It \'s being used.');
        return;
      case 2:
        alert('You\'ve already turn the washer on.');
        return;
      case 3:
        alert('You need to get the clothes out.');
        return;
      default:
        alert('Wrong mode code.');
        return;
    }
  }

  timeOn() {
    this.timerID = setInterval(() => this.tick(), UNIT);
    this.timerOut = setTimeout(() => {
      this.setState({
        time: 0,
        mode: 3,
        text: 'You should get out the clothes.'
      })
    }, MINTUES * UNIT);
  }

  tick() {
    if (this.state.time === 0) {
      // this.setState({
      //   time: 0,
      //   mode: 3,
      //   text: 'You should get clothes out.'
      // });
      clearInterval(this.timerID);
      return;
    }
    this.setState((prevState) => ({
      time: prevState.time - 1
    }));
  }

  /**
   * Handle click for button 'Get clothes'.
   * @param {*event for click} e
   * Check wrong action and set the washer.
   */
  handelClickGetClothes(e) {
    e.stopPropagation();
    e.preventDefault();
    switch (this.state.mode) {
      case 1:
      case 2:
        alert('Don\'t do this.');
        return;
      case 0:
        alert('No clothes in the washer.');
        return;
      case 3:
        this.setState({
          mode: 0,
          text: 'Not being used.'
        });
        return;
      default:
        alert('Wrong mode code.');
    }
  }


  render() {
    return (
      <Panel className="Washer">
        <Grid>
          <Row>
            <h1>Washer No.{this.state.order}</h1>
          </Row>
          <Row>
            <p className="washer-text">Time: {this.state.time}</p>
          </Row>
          <Row>
            <p className="washer-text">Current Status: {this.state.text}</p>
          </Row>
          <Row>
            <Col xs={4} md={4} />
            <Col>
              <ButtonToolbar>
                <Button onClick={this.handleClickOn} >On</Button>
                <Button onClick={this.handelClickGetClothes}>Get Clothes</Button>
              </ButtonToolbar>
            </Col>
          </Row>
        </Grid>
      </Panel>
    );
  }

}

export default Washer;
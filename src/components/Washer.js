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

class Washer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: props.mode, // 0:empty 1:working 2:completed
      user: props.user,
      text: props.text,
      time: props.time,
      group: props.group,
      id: props.id
    };
    this.handleClickOn = this.handleClickOn.bind(this);
    this.handelClickGetClothes = this.handelClickGetClothes.bind(this);
    // this.timeOn = this.timeOn.bind(this);
    // this.tick = this.tick.bind(this);
  }



  /**
   * Handle the click for button 'On'.
   * @param {*Event for click} e
   * Check wrong action and start timeOn().
   */
  handleClickOn(e) {
    e.stopPropagation();
    e.preventDefault();

    const i = {
      group: this.state.group,
      id: this.state.id
    };

    this.props.onClickOn(i);

  }

  /**
   * Handle click for button 'Get clothes'.
   * @param {*event for click} e
   * Check wrong action and set the washer.
   */
  handelClickGetClothes(e) {
    e.stopPropagation();
    e.preventDefault();

    const i = {
      group: this.state.group,
      id: this.state.id
    };

    this.props.onClickGet(i);
  }


  render() {
    return (
      <Panel className="Washer">
        <Grid>
          <Row>
            <h1>Washer No.{this.state.id}</h1>
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
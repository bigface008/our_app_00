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
  }

  handleUserChange(name) {
    this.setState({
      current_user: name
    });
  }

  handleGroupChange(group) {
    this.setState({ selected_group: group });
  }

  render() {
    let tmp = [];
    this.state.washers[this.state.selected_group].forEach(i => {
      tmp.push(<Washer key={i.id} order={i.id} />);
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


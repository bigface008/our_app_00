require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'

export const WASHER_GROUP = [2, 1, 3];

class Group_Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_group: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(eventKey, event) {
      console.log('select changes')
    this.props.onGroupChange(eventKey);
  }

  render() {
    let tmp = [];
    for (let i = 0; i < WASHER_GROUP.length; i++)
      tmp.push(
        <MenuItem key={i} eventKey={i}>{i}</MenuItem>
      );
    return (
      <div>
        <p>Choose your group:</p>
        <DropdownButton 
            title="Group" id="dropdown"
            onSelect={this.handleChange}>
          {tmp}
        </DropdownButton>
      </div>
    );
  }
}

export default Group_Selector;

require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

export const WASHER_GROUP = [2, 1, 3];

class Group_Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_group: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onGroupChange(event.target.value);
  }

  render() {
    let tmp = [];
    for (let i = 0; i < WASHER_GROUP.length; i++)
      tmp.push(
        <option value={i}>{i}</option>
      );
    return (
      <div className="left">
        <p>Choose your group:</p>
        <select value={this.state.value} onChange={this.handleChange}>
          {tmp}
        </select>
      </div>
    );
  }
}

export default Group_Selector;

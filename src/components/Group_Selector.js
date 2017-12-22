require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import MenuItem from 'react-bootstrap/lib/MenuItem'
import Tooltip from 'react-bootstrap/lib/Tooltip'
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger'

export const WASHER_GROUP = [2, 1, 3];

const tooltip = (
    <Tooltip id="login-tooltip">点击以切换楼层。</Tooltip>
  );

class Group_Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_group: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(eventKey, event) {
    this.props.onGroupChange(eventKey);
    this.setState({selected_group:eventKey});
  }

  render() {
    let tmp = [];
    for (let i = 0; i < WASHER_GROUP.length; i++)
      tmp.push(
        <MenuItem key={i} eventKey={i}>{i}</MenuItem>
      );
    
    let dropdown_title = 'Group: '+ this.state.selected_group;
    return (
      <div>
        <OverlayTrigger placement="right" overlay={tooltip}>
        <DropdownButton 
            className="group-selector"
            title={dropdown_title} id="group-dropdown" noCaret
            onSelect={this.handleChange}>
          {tmp}
        </DropdownButton>
        </OverlayTrigger>
      </div>
    );
  }
}

export default Group_Selector;

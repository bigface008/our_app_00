require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

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
      <div className="Washer" width="50%">
        <p className="headline-main">
          Washer No.{this.state.id}
        </p>
        <div className="main-content">
          <p className="Clock">
            Time: {this.state.time}
          </p>
          <p>
            {this.state.text}
            <br /><br />
            <button className="On" onClick={this.handleClickOn} >On</button>
            <button className="GetClothes" onClick={this.handelClickGetClothes}>
              Get Clothes
                </button>
          </p>
        </div>
      </div>
    );
  }

}

export default Washer;
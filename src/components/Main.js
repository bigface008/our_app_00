require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

let timeArray = [5, 45, 45]; // should be changed to 45 * 3
const EXP_MIN = 1000; // should be changed to 1000 * 60 when handed in
const WASHER_GROUP = [2,1,3];

class Washer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 0 - not being used && no clothes in washer
      // 1 - someone else is using it
      // 2 - you are using it
      // 3 - not being used && clothes in washer
      user: props.user,
      text: 'Not being used.',
      time: props.time,
      group: props.group,
      id: props.id
    };
    this.handleClickOn = this.handleClickOn.bind(this);
    this.handelClickGetClothes = this.handelClickGetClothes.bind(this);
    this.timeOn = this.timeOn.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentWillUnmount() {
    if (this.timer) clearTimeout(this.timer);
    if (this.timerID) clearInterval(this.timerID);
  }

  /**
   * Count the minutes.
   * @param Nothing
   * @returns Nothing
   */
  timeOn() {
    let mins = timeArray[this.props.order];                  // Get the time from timeArray.
    this.setState({
      time: mins
    });
    this.timerID = setInterval(() => this.tick(), EXP_MIN);  // Renew the counter.
    this.timer = setTimeout(() => {                          // End the counter.
      this.setState({
        time: 0,
        user: 3,
        text: 'You can get your clothes.'
      });
      alert('Get your clothes.');
    }, EXP_MIN * mins);
  }

  /**
   * Renew the time per EXP_MIN * ms.
   */
  tick() {
    if (this.state.time === 0) {    // Clean the timerID to stop this.
      clearInterval(this.timerID);
      return;
    }
    this.setState((prevState) => ({
      time: prevState.time - 1
    }));
  }

  /**
   * Handle the click for button 'On'.
   * @param {*Event for click} e
   * Check wrong action and start timeOn().
   */
  handleClickOn(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.state.user === 1) {
      alert('It is being used.');
      return;
    }
    else if (this.state.user === 2) {
      alert('You\'ve already turn the washer on.');
      return;
    }
    else if (this.state.user === 3) {
      alert('You need to get the clothes out.');
      return;
    }
    this.setState({
      user: 2,
      text: 'Being used.'
    },
      () => {
        this.timeOn();
      }
    );
    return;
  }

  /**
   * Handle click for button 'Get clothes'.
   * @param {*event for click} e
   * Check wrong action and set the washer.
   */
  handelClickGetClothes(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.state.user === 2 || this.state.user === 1) {
      alert('Don\' do this.');
      return;
    }
    else if (this.state.user === 0) {
      alert('No clothes in the washer.');
    }
    this.setState({
      user: 0,
      text: 'Not being used.'
    });
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
              <br/><br/>
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

function WasherList(props){
  var tmp = [];
  for(let i=0;i<WASHER_GROUP[props.group];i++){
    tmp.push(
    <Washer user={0} time={0} group={props.group} id={i} />);
  }

  return (
    <div className="List">
     {tmp}
    </div> );
}

// class List extends React.Component {
  
//   render() {
//     return (
//       <div>
//         <div className="List">
//          <Washer 
//           user={0}
//           time={0}
//           group={0}
//           id={0} />
//         </div>
//       </div>
//     );
//   }
// }


class Group_Selector extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selected_group:0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onGroupChange(event.target.value);
  }

  render(){
    return(
      <div className="left">  
       <select className="group-selector" value={this.state.value} onChange={this.handleChange}>
        <option value={0}>0</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
      </select>
     </div>
    );
  }
}

class AppComponent extends React.Component {
  constructor(){
    super();
    this.state ={
      selected_group:0
    };
    this.handleGroupChange = this.handleGroupChange.bind(this);
  }

  handleGroupChange(group){
    this.setState({selected_group:group});
  }

  render() {
    return (
      <div>
        <Group_Selector onGroupChange={this.handleGroupChange}/>
        <WasherList group={this.state.selected_group}/>
      </div>
    );
  }
}


AppComponent.defaultProps = {
};

export default AppComponent;




// class Title_Description extends React.Component {
//   render() {
//     return (
//       <div className="left">
//         <p className="title">App of Washers</p>
//         <p className="description">your can use this app to see weather the washer is being used, and it can also remind your of getting clothes.</p>
//       </div>
//     );
//   }
// }
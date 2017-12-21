require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

// let timeArray = [5, 45, 45]; // should be changed to 45 * 3
// const EXP_MIN = 1000; // should be changed to 1000 * 60 when handed in
const WASHER_GROUP = [2,1,3];

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
    // e.stopPropagation();
    // e.preventDefault();

    const i = {
      group:this.state.group,
      id:this.state.id
    };

    this.props.onClickOn(i);

  }

  /**
   * Handle click for button 'Get clothes'.
   * @param {*event for click} e
   * Check wrong action and set the washer.
   */
  handelClickGetClothes(e) {
    // e.stopPropagation();
    // e.preventDefault();

    const i = {
      group:this.state.group,
      id:this.state.id
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
    let tmp = [];
    for(let i=0;i<WASHER_GROUP.length;i++)
      tmp.push(
        <option value={i}>{i}</option>
      );
    return(
      <div className="left">  
       <select className="group-selector" value={this.state.value} onChange={this.handleChange}>
        {tmp}
      </select>
     </div>
    );
  }
}

class AppComponent extends React.Component {
  constructor(){
    super();
    this.state ={
      selected_group:0,
      display:0
    };
    this.washers =[];

    this.handleGroupChange = this.handleGroupChange.bind(this);
    this.handleClickOn = this.handleClickOn.bind(this);
    this.handleClickGet = this.handleClickGet.bind(this);
    // this.tick = this.tick.bind(this);

    // Init the washers, store all washers in this component
    for(let i=0;i<WASHER_GROUP.length;i++){
      let tmp = [];
      for(let j=0;j<WASHER_GROUP[i];j++){
        let washer = {
          mode:0,
          user:'',
          text:'init',
          time:0,
          group:i,
          id:j
        };
        tmp.push(washer);
      }
      this.washers.push(tmp);
    }
    console.log(this.washers);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleGroupChange(group){
    this.setState({selected_group:group});
  }

  handleClickOn(e){
    alert('click on',e.group,e.id);
    switch(this.washers[e.group][e.id].mode){
      case 0:
        this.washers[e.group][e.id].mode=1;
        this.washers[e.group][e.id].time=45;
        this.washers[e.group][e.id].text='washing';
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

  handleClickGet(e){
    alert('click get');
    if(this.washers[e.group][e.id].mode==2){
      this.washers[e.group][e.id].mode=0;
      this.washers[e.group][e.id].text='init';
    }
    else{
      alert('error');
    }
  }

  tick(){
    this.washers.forEach(i =>{
      i.forEach(w => {
        if(w.mode == 1){
          w.time--;
          if(w.time == 0)w.mode=2;
        }
      });
    });
    this.forceUpdate();
  }

  render() {
    let tmp = [];
    this.washers[this.state.selected_group].forEach(i => {
      const w = (
        <Washer key={i.group*100+i.id+i.time*1000} mode={i.mode}
          user={i.user} time={i.time} group={this.state.selected_group} id={i.id} text={i.text} 
          onClickOn={this.handleClickOn} onClickGet={this.handleClickGet} />
      );
      tmp.push(w);
    });
    
    return (
      <div>
        <Group_Selector onGroupChange={this.handleGroupChange}/>
        <div className="List">
          {tmp}
        </div> 
      </div>
    );
  }
}


AppComponent.defaultProps = {
};

export default AppComponent;


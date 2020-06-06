class Clock extends React.Component {
  format(time) {
    let seconds = time % 60;
    let minutes = Math.floor(time / 60);
    let millsec = Math.floor(minutes/60);
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    millsec = millsec.toString().length === 1 ? "0" + millsec : millsec;
    return minutes + ':' + seconds + ':' + millsec;
  }
  render() {
    const { time } = this.props;
    return (
      React.createElement("div", { className: "displayedTime" },
      React.createElement("h1", null, this.format(time))));


  }}
  
  class Clock2 extends React.Component {
  format(time2) {
    let seconds = time2 % 60;
    let minutes = Math.floor(time2 / 60);
    let millsec = Math.floor(minutes/60);
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    millsec = millsec.toString().length === 1 ? "0" + millsec : millsec;
    return minutes + ':' + seconds + ':' + millsec;
  }
  render() {
    const { time2 } = this.props;
    return (
      React.createElement("div", { className: "displayedTime2" },
      React.createElement("h1", null, this.format(time2))));


  }}

class Clock3 extends React.Component {
  format(time3) {
    let seconds = time3 % 60;
    let minutes = Math.floor(time3 / 60);
    let millsec = Math.floor(minutes/60);
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    millsec = millsec.toString().length === 1 ? "0" + millsec : millsec;
    return minutes + ':' + seconds + ':' + millsec;
  }
  render() {
    const { time3 } = this.props;
    return (
      React.createElement("div", { className: "displayedTime3" },
      React.createElement("h1", null, this.format(time3))));


  }}
class Input extends React.Component {

  onSubmit(event) {
    event.preventDefault();
    const strSeconds = this.refs.seconds.value;
    if (strSeconds.match(/[0-9]/)) {
      this.refs.seconds.value = '';
      this.props.onSetCountdown(parseInt(strSeconds, 10));
    }
  }

  render() {
    return (
      
      React.createElement("input", { type: "submit", value: "Start" }));


  }}


class Button extends React.Component {
  render() {
    return (
      React.createElement("button", { onClick: this.props.onClickHandler }, this.props.label));

  }}
class Labling extends React.Component {
  render() {
    return (
      React.createElement("labble", this.props.label));
      
  }}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      running: false };

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.running !== prevState.running) {
      switch (this.state.running) {
        case true:
          this.handleStart();}

    }
  }

  handleStart() {
    this.timer = setInterval(() => {
      const newCount = this.state.count - 1;
      this.setState(
      { count: newCount >= 0 ? newCount : 0 });

    }, 1000);
  }

  handleStop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.setState(
      { running: false });

    }
  }

  handleReset() {
    this.setState(
    { count: 0 });

  }

  handleCountdown(seconds) {
    this.setState({
      count: seconds,
      running: true });

  }

  render() {
    const { count } = this.state;
    return (
      React.createElement("div", { className: "container" },
      React.createElement(Button, { label: "Timer 1" }),
      React.createElement(Clock, { time: count }),
      React.createElement(Input, { onSetCountdown: this.handleCountdown.bind(this) }),
      React.createElement(Button, { label: "stop", onClickHandler: this.handleStop.bind(this) }),
      React.createElement(Button, { label: "reset", onClickHandler: this.handleReset.bind(this) })));


  }}
  
  class App2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      running: false };

  }

  componentDidUpdate2(prevProps, prevState) {
    if (this.state.running !== prevState.running) {
      switch (this.state.running) {
        case true:
          this.handleStart();}

    }
  }

  handleStart2() {
    this.timer = setInterval(() => {
      const newCount = this.state.count - 1;
      this.setState(
      { count: newCount >= 0 ? newCount : 0 });

    }, 1000);
  }

  handleStop2() {
    if (this.timer) {
      clearInterval(this.timer);
      this.setState(
      { running: false });

    }
  }

  handleReset2() {
    this.setState(
    { count: 0 });

  }

  handleCountdown2(seconds) {
    this.setState({
      count: seconds,
      running: true });

  }

  render() {
    const { count } = this.state;
    return (
      React.createElement("div", { className: "container" },
      React.createElement(Button, { label: "Timer 2" }),
      React.createElement(Clock, { time: count }),
      React.createElement(Input, { onSetCountdown: this.handleCountdown2.bind(this) }),
      React.createElement(Button, { label: "stop", onClickHandler: this.handleStop2.bind(this) }),
      React.createElement(Button, { label: "reset", onClickHandler: this.handleReset2.bind(this) })));


  }}
  
  class App3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      running: false };

  }

  componentDidUpdate3(prevProps, prevState) {
    if (this.state.running !== prevState.running) {
      switch (this.state.running) {
        case true:
          this.handleStart();}

    }
  }

  handleStart3() {
    this.timer = setInterval(() => {
      const newCount = this.state.count - 1;
      this.setState(
      { count: newCount >= 0 ? newCount : 0 });

    }, 1000);
  }

  handleStop3() {
    if (this.timer) {
      clearInterval(this.timer);
      this.setState(
      { running: false });

    }
  }

  handleReset3() {
    this.setState(
    { count: 0 });

  }

  handleCountdown3(seconds) {
    this.setState({
      count: seconds,
      running: true });

  }

  render() {
    const { count } = this.state;
    return (
      React.createElement("div", { className: "container" },
      React.createElement(Button, { label: "Timer 3" }),
      React.createElement(Clock, { time: count }),
      React.createElement(Input, { onSetCountdown: this.handleCountdown3.bind(this) }),
      React.createElement(Button, { label: "stop", onClickHandler: this.handleStop3.bind(this) }),
      React.createElement(Button, { label: "reset", onClickHandler: this.handleReset3.bind(this) })));


  }}

//***************************************************************
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var miliseconLable = document.getElementById("milisecond");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
  miliseconLable.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

    
    var running = 0
var time = 0;
var hour = 0;
var min = 0;
var sec = 0;
var millisec = 0;


function start(){
	started = window.setInterval(clockRunning, 1000);	
}

function stop(){
	window.clearInterval(started);
}

function clockRunning(){
	time++;
	sec++;
	if (sec == 60){
		min += 1;
		sec = 0;
	if (min == 60){
		hour += 1;
		min = 0;
	}
	
	
	}

	document.getElementById("display-area").innerHTML = (hour ? (hour > 9 ? hour : "0" + hour) : "00") 
	+ ":" + (min ? (min > 9 ? min : "0" + min) : "00") + ":" + (sec > 9 ? sec : "0" 
		+ sec);
};
ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
ReactDOM.render(React.createElement(App2, null), document.getElementById('app2'));
ReactDOM.render(React.createElement(App3, null), document.getElementById('app3'));

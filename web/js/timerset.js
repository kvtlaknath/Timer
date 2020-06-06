class Clock extends React.Component {
  format(time = new Date()) {

    let totalcount =0;
    let millsec = time % 1000;
  time = (time - millsec) / 1000;
  let seconds = Math.floor(time % 60);
  time = (time - seconds) / 60;
  let minutes = Math.floor(time % 60);
    
    minutes = minutes.toString().length === 1 ? "0" + minutes : minutes;
    seconds = seconds.toString().length === 1 ? "0" + seconds : seconds;
    millsec = millsec.toString().length === 1 ? "00" + millsec : millsec;
    return minutes + ':' + seconds + ':' + millsec;
  }
  render() {
    const { time } = this.props;
    return (
      React.createElement("div", { className: "displayedTime" },
      React.createElement("h1", null, this.format(time))));
      
     


  }}


class Lable extends React.Component {
 
  render() {
    
    return (
      React.createElement("form", { className: "lable" }));
  }}

class Input extends React.Component {

  onSubmit(event) {
        console.log("teeeee");
    event.preventDefault();
    
    this.refs.millsec.value = 0;
    const strMillsec = this.refs.millsec.value;
    if (strMillsec.match(/[0-9]/)) {
      this.refs.millsec.value = '';
      this.props.onSetCountdown(parseInt(strMillsec, 10));
    }
  }

  render() {
    return (
      React.createElement("form", { ref: "form", onSubmit: this.onSubmit.bind(this) },
      React.createElement("input", { type: "submit",ref: "millsec", value: "play" ,onSubmit: this.onSubmit.bind(this)})));


  }}


class Button extends React.Component {
    
  render() {
    return (
      React.createElement("button", { onClick: this.props.onClickHandler }, this.props.label));
 
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
      console.log("ststststs")
    this.timer = setInterval(() => {
      const newCount = this.state.count + 5;
      const totalcount = this.state.count+newCount;
      this.setState(
      { count: newCount > 0 ? newCount : 0 });

    }, 1);
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

  handleCountdown(millsec) {
    this.setState({
      count: millsec,
      running: true });

  }

  render() {
    const { count } = this.state;
    return (
      React.createElement("div", { className: "container" },
      React.createElement(Lable, { lable: "Timer 1" }),
      React.createElement(Clock, { time: count }),
      React.createElement(Input, { onSetCountdown: this.handleCountdown.bind(this) }),
      React.createElement(Button, { label: "pause", onClickHandler: this.handleStop.bind(this) }),
      React.createElement(Button, { label: "reset", onClickHandler: this.handleReset.bind(this) })));


  }}
  
  
  //***************ToTal***********
 
  class Apptotal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: true };

  }
  render() {
    const { totalcount } = this.state;
    return (
      React.createElement("div", { className: "container" },
      React.createElement(Lable, { lable: "Total Timer" }),
      React.createElement(Clock, { time: totalcount })));


  }}

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
ReactDOM.render(React.createElement(App, null), document.getElementById('app2'));
ReactDOM.render(React.createElement(App, null), document.getElementById('app3'));
ReactDOM.render(React.createElement(Apptotal, null), document.getElementById('total'));

  
var j = schedule.scheduleJob({  rule: '*/1 * * * * *' }, function(){
  this.Apptotal.render();
});
    

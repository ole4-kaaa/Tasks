import React, { Component, Fragment } from 'react';
import '../App.css';

class Timer extends Component {
	state = { 
		minutes: 25,
		seconds: 0,
		time: 0
	}
	componentDidMount() {
		
	}
	
	render() {
		return (
			<div className="timer">
				<div className="timer__count">{this.state.seconds < 10 ? '0' : ''}{this.state.minutes} : {this.state.seconds < 10 ? '0' : ''}{this.state.seconds}</div>
					{this.state.time === 0 && <Fragment><span onClick={this.startTimer}>Старт</span> |</Fragment>} <span onClick={() => this.stopTimer()}>Стоп</span>
			</div>
		);
	}
	
	startTimer = () => {
		if(this.props.timer) {
			alert('Сначала завершите активную задачу!');
			return false
		}
		this.props.start(this.props.id)
		this.interval = setInterval(() => this.tick(), 1000);
	}
	
	stopTimer = () => {
		this.props.finish(this.props.id, this.state.time)
		clearInterval(this.interval);
		this.setState({
			minutes: 25,
			seconds: 0,
			time: 0
		})
	}
	
	tick() {
		if(this.state.minutes === 0 && this.state.seconds === 0) {
			this.stopTimer()
		} else {
			this.setState(state => ({
				minutes: !this.state.seconds ? this.state.minutes - 1 : this.state.minutes,
				seconds: !this.state.seconds ? 59 : this.state.seconds - 1,
				time: this.state.time + 1
			}));
		}
	}

}

export default Timer;

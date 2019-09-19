import React, { Component } from 'react';
import './App.css';
import Addtask from './components/Addtask';
import Timer from './components/Timer';

class App extends Component {
	state = {
		timer: false,
		tasks: []
	}
	
	render() {
		return (
			<div className="tasksBlock">
				<Addtask addTask={this.addTask} />
				{this.state.tasks.length > 0 && (
					<div className="tasksList">
						{this.taksList()}
					</div>
				)}
			</div>
		);
	}
	
	addTask = (title, text) => {
		const result = this.state.tasks
		result.push({'id': this.state.tasks.length + 1, 'title': title, 'text': text, 'status': 'new', 'tomatos': 0})
		this.setState({'tasks': result})
	}
	
	taksList() {
		return this.state.tasks.map(( el, key ) => {
			return (
				<div className={el.status === 'finish' ? "tasksList__item tasksList__item_comlite" : "tasksList__item"} key={key}>
					<div className="tasksList__left">
						<div className="tasksList__title">{el.title}</div>	
						<div className="tasksList__text">{el.text}</div>	
						<div className="tasksList__actions">
							Действия:
							<span onClick={() => this.removeTask(key)} className="tasksList__delete">Удалить</span> 
							{el.status === 'new' && <span onClick={() => this.finishTask(key)} className="tasksList__finish">Завершить задачу</span>}
						</div>
					</div>
					<div className="tasksList__right">
						{el.status === 'new' && <Timer id={key} start={this.startTimer} finish={this.countTime} timer={this.state.timer} />}						
						{el.tomatos > 0 && (
							<div className="tasksList__time">
								На задачу потрачено:<br/>
								{parseFloat(el.tomatos/1500).toFixed(4)} {this.declOfNum(parseFloat(el.tomatos/1500).toFixed(4), [' помидора', ' помидора', ' помидора'])}
							</div>)
						}
					</div>
				</div>
			)
		})
	}	
	
	removeTask = (key) => {
		const result = this.state.tasks
		delete result[key];
		this.setState({'tasks': result})
	}
	
	finishTask = (key) => {
		const result = this.state.tasks
		result[key].status = 'finish'
		this.setState({'tasks': result})
	}
	
	startTimer = (key) => {
		this.setState({'timer': true})
	}
	
	countTime = (key, time) => {
		const result = this.state.tasks
		result[key].tomatos += time
		this.setState({'timer': false, 'tasks': result})
	}
	
	declOfNum = (number, titles) => {  
		var cases = [2, 0, 1, 1, 1, 2]  
		return titles[ ((number ^ 0) !== number) ? 0 : (number%100>4 && number%100<20? 2 : cases[(number%10<5)?number%10:5])  ]  
	}
}

export default App;

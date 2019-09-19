import React, { Component } from 'react';
import '../App.css';

class Addtask extends Component {
	
	state = {
		title: '',
		text: ''
	}
	
	render() {
		return (
			<div className="tasksBlock__header">
				<h4>Добавить задачу</h4>
				<div className="form">
					<label className="form__label">Введите название задачи:</label>
					<input 
						type="text"					
						value={this.state.title}
						onChange={this.handleChange('title')}
						className="form__input" />
					<label className="form__label">Введите описание задачи:</label>
					<textarea  
						value={this.state.text}
						onChange={this.handleChange('text')}					
						className="form__textarea" />
					<button type="submit" className="btn" onClick={this.submitTask}>Добавить задачу</button>
				</div>
			</div>
		);
	}
	
	submitTask = () => {
		if(!this.state.title) {
			alert('Введите название задачи');
			return false
		}
		this.props.addTask(this.state.title, this.state.text)
		this.setState({
			title: '',
			text: ''
		})
	}
	
	handleChange = (type) => (ev) => {
		const { value } = ev.target
		this.setState({
			[type]: value
		})
	}

}

export default Addtask;

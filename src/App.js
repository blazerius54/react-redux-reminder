import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { addReminder, deleteReminder, clearReminders } from './actions/index';
import './App.css';


class App extends Component {
  constructor (props) {
    super (props);
    this.state = {
      text: '',
      date: '',
      id: Math.random()
    }
  }
  componentDidMount() {
    console.log(this.props.reminders) 
  }

  addReminder() {
    console.log('this'+this);
    this.props.addReminder(this.state.text, this.state.date, this.state.id);
    this.setState({
      text: '',
      date: '',
      id: Math.random()
    })
    this.input.value = ''
    this.dateInput.value = ''
  }

  deleteReminder(id) {
    this.props.deleteReminder(id)
  }

  clearReminders() {
    this.props.clearReminders()
  }

  renderReminders() {
    const { reminders } = this.props;
    // const reminders  = this.props.reminders;
    return (
      <ul className='list-group col-sm-4'>
        {
          reminders.map((task, index)=>{
            return (
              <li className='list-group-item' key={task.id}>
                <div className='list-item'>{task.text}</div>
                <div className='list-item inner-div'>
                  <div className='list-item'><em>{moment(new Date(task.date)).fromNow()}</em></div>
                  <div className='list-item delete-button' onClick={()=>this.deleteReminder(task.id)}>&#x2715;</div>
                </div>
              </li>
            )
          })
        }
      </ul>
    )
  }

  renderClearBtn () {
    if(this.props.reminders.length){
    return (
      <button 
      className='btn btn-danger'
      onClick={()=>this.clearReminders()}
      >Clear All</button>
    )}
  }

  render() {
    // console.log(this.props);
    return (
      <div className="App">
        <div className="title">
          Reminder Pro
        </div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input 
            type="text" 
            className="form-control" 
            placeholder='I have to do...'
            onChange={(e)=>{this.setState({text:e.target.value})}}
            ref={(ref) => {this.input = ref}}
            />
            <input 
            type="datetime-local" 
            className="form-control" 
            onChange={(e)=>{this.setState({date: e.target.value})}}
            ref={(ref=> {this.dateInput = ref})}
            />
          <button 
          className='btn btn-success'
          onClick={()=>this.addReminder()}
          >Add Reminder</button>
          </div>
        </div>
          {this.renderReminders()}
          {this.renderClearBtn()}
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    reminders: state.reminders,
    test: state.test
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addReminder, deleteReminder, clearReminders}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
import {ADD_REMINDER, DEL_REMINDER, CLEAR_REMINDERS} from '../constants/constants'
import { bake_cookie, read_cookie } from 'sfcookies';
import { combineReducers } from 'redux';

const reminder = (action) => {
    return {
        text: action.text,
        date: action.date,
        // id: Math.random(),
        id: action.id
    }
}

const delReminder = (state=[], id) => {
    const reminders = state.filter(task=> task.id!==id );
    console.log(reminders);
    return reminders;
} 

const reminders = (state=[], action) => {
    console.log(state)
    let reminders = null;
    state = read_cookie('reminders');
    switch (action.type) {
        case ADD_REMINDER:
            reminders = [...state, reminder(action)];
            bake_cookie('reminders', reminders);
            return reminders;
        case DEL_REMINDER: 
            reminders = delReminder(state, action.id);
            bake_cookie('reminders', reminders);            
            return reminders;
        case CLEAR_REMINDERS:
            reminders = [];
            bake_cookie('reminders', reminders);                        
            return reminders
        default: 
            return state;
    }
}

const test = () => {
    return 'Hi, I`m test!'
}

const reducers = combineReducers({reminders, test})
// export default reminders;
export default reducers;
import {ADD_REMINDER, DEL_REMINDER, CLEAR_REMINDERS} from '../constants/constants'


export const addReminder = (text, date, id) => {
    const action = {
        type: ADD_REMINDER,
        text,
        date,
        id    
    }
    console.log('action is ', action)
    return action;
}

export const deleteReminder = (id) => {
    const action = {
        type: DEL_REMINDER,
        id
    }
    console.log(id)
    return action
}

export const clearReminders = () => {
    const action = {
        type: CLEAR_REMINDERS
    }
    return action
}
import {combineReducers} from 'redux';
import alert from './alert';
import auth from './Auth';
import profile from './profile';
import post from './post';

export default combineReducers({
    alert,
    auth,
    profile,
    post
})
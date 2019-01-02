import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import searchMineralsReducer from './searchMineralsReducer';

export default combineReducers({
    minerals: searchMineralsReducer,
    form: reduxForm
});
/* ==== EXAMPLE ==== 
import reducer from './reducer';
import another_reducer from './another_reducer';
import {combineReducers} from 'redux';

const reducers = combineReducers({
  fancy_slug: reducer,
  another_fancy_slug: another_reducer
})

export default reducers;
*/
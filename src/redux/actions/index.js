/* ==== EXAMPLE ====
export const action = () => {
  return {
    type: 'ACTION',
  }
}

export const actionWithProps = (props) => {
  return {
    type: 'ANOTHERACTION',
    playload: props
  }
}


==== TO CALL THEM IN ANOTHER COMPONENT ====
import {useDispatch} from 'react-redux';
import { action, actionWithProps } from '../redux/actions';

const dispatch = useDispatch();
dispatch(action());
dispatch(actionWithProps(props));


*/
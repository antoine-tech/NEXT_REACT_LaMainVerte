/* ==== EXAMPLE ====
const my_reducer = (state='value', action) => {
  switch(action.type){
    case "ACTION" :
      return state + 1;
    case "ANOTHERACTION" :
      return state + action.playload;
    default:
      return state;
  }
}

export default my_reducer;

==== TO USE IT FROM ANOTHER COMPONENT ====
import {useSelector} from 'react-redux';

const my_reducer = useSelector(state => state.my_reducer);
*/
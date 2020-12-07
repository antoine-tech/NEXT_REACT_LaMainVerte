import React from 'react';
import ReactDOM from 'react-dom';
import './style/dist/index.css';
import App from './App';

/* ====== REDUX =========
import { createStore }from 'redux';
import reducers from './redux/reducers';
import  {Provider} from 'react-redux';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  
);
*/

ReactDOM.render(
  //<Provider store={store} />
  <App />,
  //</ Provider>,
  document.getElementById('root')
);

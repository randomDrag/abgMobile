import {createStore, applyMiddleware, compose} from 'redux';

import reducers from './src/reducers';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';


// const store = createStore(
//   reducers,
//   {},
//   compose(
//     applyMiddleware(thunk),
//     window.__REDUX_DEVTOOLS_EXTENSION__ &&
//       window.__REDUX_DEVTOOLS_EXTENSION__(),
//   ),
// );

const store = createStore(reducers ,{}, applyMiddleware(thunk));

 const persistor = persistStore(store);

export  {persistor , store} 
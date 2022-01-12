import React from 'react';

import { Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react'
import   {persistor,  store} from './Store'
import Route from './Route';



class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate  persistor={persistor}>
        <Route />
        </PersistGate>
      
      </Provider>
    );
  }
}

export default App;
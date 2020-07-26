import React from 'react';

import {
  Provider
  // connect
} from 'react-redux';

import store from './redux';
import Route from './root/route';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Route />
      </div>
    </Provider>
  );
}

export default App;

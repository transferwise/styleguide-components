// import 'ngimport';

import React from 'react';
import ReactDOM from 'react-dom';
import TwDate from './forms/date/react.js';
/*
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
      <TwDate></TwDate>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
*/

function Welcome(props) {
  return React.createElement(
    'h1',
    null,
    'Hello, ',
    props.name
  );
}

function App() {
  return React.createElement(
    'div',
    null,
    React.createElement(Welcome, { name: 'Sara' }),
    React.createElement(Welcome, { name: 'Cahal' }),
    React.createElement(Welcome, { name: 'Edite' })
    , React.createElement(TwDate, null)
  );
}

ReactDOM.render(React.createElement(App, null), document.getElementById('root'));

export default {
  TwDate
};

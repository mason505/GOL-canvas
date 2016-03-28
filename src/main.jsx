import React, { Component } from 'react';
import { render } from 'react-dom';

import GOL from './Gol.jsx';


class App extends Component {
    render() {
        return (
            <div>
              <GOL />
            </div>
        );
    }
};


render( <App />, document.getElementById('app'));

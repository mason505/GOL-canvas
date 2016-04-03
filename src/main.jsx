import React, { Component } from 'react';
import { render } from 'react-dom';

import Grid from './DrawGrid.jsx';


class App extends Component {
    render() {
        return (
            <div>
              <Grid />
            </div>
        );
    }
};


render( <App />, document.getElementById('app'));

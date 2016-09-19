import React from 'react';

import Redirect from './tools/redirectjquery'
import Paypalpay from './components/paypalpay.jsx'
import PictureSelect from './components/picture/pictureselect.jsx'
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

injectTapEventPlugin();

export default class App extends React.Component {
  render() {
    return (
        <MuiThemeProvider>
          <div>
            <PictureSelect/>
          </div>
        </MuiThemeProvider>
    )
  }
}
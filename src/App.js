import React, {Fragment} from "react";
import Routes from './routes'
import { createGlobalStyle } from 'styled-components'

// function App() {
//   return (
//     <Routes/>
//   );
// }

// class App extends Component {
//   render() {
//     return <Routes/>;
//   }
// }

const App = () => (
  <Fragment>
    <GlobalStyle/>
    <Routes/>
  </Fragment>
);

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    /* Remove all Margin */
    padding: 0;
    /* Remove All Padding */
    box-sizing: border-box;
    /* Padding and / or box can't increase total element size */
    outline: 0;
    /* Remove browser default outline */
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
    color: #333;
    font-smooth: aways;
    -webkit-font-smoothing: antialiased !important;
  }
`

export default App;

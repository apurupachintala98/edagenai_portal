import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

 * {
    font-family: 'Poppins', sans-serif;
  }
 html, body {
   height: auto;
   overflow: auto;
  }

  html {
    background-position: bottom right;
    background-repeat: no-repeat;
    min-height: 100%;
    @media screen and (max-width: 40em) {
    }
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  .highcharts-axis-title {
    font-weight: bold !important;
    font-size: 0.8em !important;
    color: rgb(51,51,51) !important;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  }`;

  

export default GlobalStyle;

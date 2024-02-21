import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import "./App.css";

import {
  styleReset,
  Window,
  WindowContent,
  WindowHeader,
  Button,
  Hourglass
} from "react95";
import original from "react95/dist/themes/original";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body {
    font-family: 'ms_sans_serif';
    background-color: teal;
  }
`;

const App = () => (
  <div>
    <GlobalStyles />
    <ThemeProvider theme={original}>
      <Window resizable className="window" style={{ width: 300, height: 200, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <WindowHeader className="window-title">
          <span>Coming Soon!</span>
          <Button className="title-icon">
            <span>X</span>
          </Button>
        </WindowHeader>
        <WindowContent>
          <table>
            <tr>
              <td>
                <Hourglass size={32} style={{ marginRight: 10 }} />
              </td>
              <td>
                This page is under construction.
                Come back later!
              </td>
            </tr>
          </table>
        </WindowContent>
      </Window>

    </ThemeProvider>
  </div>
);

export default App;

import * as React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import "./App.css";

import {
  styleReset,
  WindowContent,
  Frame,
  Hourglass,
  Monitor,
  AppBar,
  Button,
  Toolbar,
} from "react95";
import original from "react95/dist/themes/original";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";

import Wnd from "./wnd";

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
    background-image: url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/a2cbce8b-086a-4a4b-86fa-97085e49c9c3/d2grk4v-5348465b-d912-4744-a253-6f8801c26ef7.jpg');
    background-size: cover;
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windows: {
        "coming-soon": "open",
        "hello": "minimized",
      },
    };
  }

  updateWindowState(windowName, state) {
    this.setState({
      windows: {
        ...this.state.windows,
        [windowName]: state,
      },
    });
  }

  render() {
    return (
      <div>
        <GlobalStyles />
        <ThemeProvider theme={original}>

          <Wnd
            title="Coming Soon!"
            width={500}
            height={400}
            noMaximize
            centered
            open={
              this.state.windows["coming-soon"] === "open" ||
              this.state.windows["coming-soon"] === "minimized"
            }
            minimized={this.state.windows["coming-soon"] === "minimized"}
            onClose={() => this.updateWindowState("coming-soon", "closed")}
            onMinimize={(x) => this.updateWindowState("coming-soon", x)}
          >
            <WindowContent>
              <table>
                <tr>
                  <td>
                    <Hourglass size={45} style={{ marginRight: 10 }} />
                  </td>
                  <td>This page is under construction. Come back later!</td>
                </tr>
              </table>
              <Monitor
                style={{ marginTop: 10, marginLeft: `${(500 - 230) / 2}px` }}
                backgroundStyles={{
                  backgroundImage:
                    "url('https://img.itch.zone/aW1hZ2UvMTkzODU2LzkwNTk3NS5naWY=/original/9UYgFE.gif')",
                  backgroundSize: "cover",
                }}
              />
            </WindowContent>
            <Frame variant="well" className="footer">
              - Aditya
            </Frame>
          </Wnd>

          <Wnd
            title="A second Window"
            width={400}
            height={300}
            position={{ x: 100, y: 100 }}
            noMaximize
            open={
              this.state.windows["hello"] === "open" ||
              this.state.windows["hello"] === "minimized"
            }
            minimized={this.state.windows["hello"] === "minimized"}
            onClose={() => this.updateWindowState("hello", "closed")}
            onMinimize={(x) => this.updateWindowState("hello", x)}
          >
            <WindowContent>
              This is just a second window to demonstrate the appbar.
              Close it and the appbar will update.
            </WindowContent>
        
          </Wnd>

          <AppBar style={{ minHeight: "47px", position: "absolute", bottom: 0, top: "auto" }}>
            <Toolbar style={{ justifyContent: "left" }}>

              {Object.keys(this.state.windows).map((windowName) => {
                if (
                  this.state.windows[windowName] === "open" ||
                  this.state.windows[windowName] === "minimized"
                ) {
                  return (
                    <Button
                      key={windowName}
                      onClick={() =>
                        this.updateWindowState(
                          windowName,
                          this.state.windows[windowName] === "open"
                            ? "minimized"
                            : "open"
                        )
                      }
                      active = {this.state.windows[windowName] === "open"}
                      style={{
                        float: "left",
                        marginLeft: "5px",
                      }}
                    >
                      {windowName}
                    </Button>
                  );
                }
                return null;
              })}
              <Frame variant="well" style={{ marginLeft: "auto", marginRight: "0px", paddingRight:"5px", paddingLeft:"5px" }} disabled>
                <span>{new Date().toLocaleString()}</span>
              </Frame>
            </Toolbar>
             
          </AppBar>
        </ThemeProvider>
      </div>
    );
  }
}

export default App;

import * as React from "react";

import { Window, WindowHeader, Button } from "react95";

class Wnd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            position: { x: 0, y: 0 },
            isDragging: false,
        };

        if (props.position) {
            this.state.position = props.position;
        }

        if (props.centered) {
            this.state.position = {
                x: window.innerWidth / 2 - props.width / 2,
                y: window.innerHeight / 2 - props.height / 2,
            };
        }
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
    }

    handleMouseMove(e) {
        if (this.state.isDragging) {
            this.setState({
                position: {
                    x: e.clientX - this.state.offset.x,
                    y: e.clientY - this.state.offset.y,
                },
            });
        }
    }

    handleMouseUp() {
        this.setState({ isDragging: false });
    }

    handleMouseDown(e) {
        this.setState({
            isDragging: true,
            offset: {
                x: e.clientX - this.state.position.x,
                y: e.clientY - this.state.position.y,
            },
        });
    }

    renderClose() {
        if (this.props.noClose) {
            return null;
        } else {
            return (

                <Button className="title-icon" onClick={this.handleClose.bind(this)}>
                    <span>X</span>
                </Button>

            );
        }
    }

    renderMaximize() {
        if (this.props.noMaximize) {
            return null;
        } else {
            return (
                <Button className="title-icon">
                    <span>+</span>
                </Button>
            );
        }
    }

    renderMinimize() {
        if (this.props.noMinimize) {
            return null;
        } else {
            return (
                <Button className="title-icon" onClick={this.handleMinimize.bind(this)}>
                    <span>-</span>
                </Button>
            );
        }
    }

    handleClose() {
        this.props.onClose();
    }

    handleMinimize() {
        if (this.props.minimized) {
            this.props.onMinimize("open");
        } else {         
            this.props.onMinimize("minimized");
        }
    }

    render() {
        if (!this.props.open) {
            return null;
        } 
        if (this.props.minimized) {
            return null;
        }
        return (
                <Window
                    resizable={!this.props.noResize}
                    className="window"
                    style={{
                        width: `${this.props.width}px`,
                        height: `${this.props.height}px`,
                        position: "absolute",
                        top: `${this.props.top}`,
                        left: `${this.props.left}`,
                        transform: `translate(${this.state.position.x}px, ${this.state.position.y}px)`,
                        userSelect: "none",
                    }}
                    onMouseHover={this.handleMouseUp}
                    onMouseEnter={this.handleMouseUp}

                >
                    <WindowHeader
                        className="window-title"
                        onMouseMove={this.handleMouseMove}
                        onMouseUp={this.handleMouseUp}
                        onMouseDown={this.handleMouseDown}
                        onMouseHover={this.handleMouseUp}
                        style={{
                         cursor: "move",
                        }
                        }
                    >
                        <span> {this.props.title} </span>
                        {this.renderClose()} {this.renderMaximize()} {this.renderMinimize()}
                    </WindowHeader>
                    {this.props.children}
                </Window>
        );
    }
}

export default Wnd;

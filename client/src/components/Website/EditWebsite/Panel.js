import React from "react";

import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai"

export default class Panel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: true
        }
    }
    render() {
        const Icon = this.state.expanded ? AiOutlineArrowLeft : AiOutlineArrowRight
        return (
            <div id="mySidenav" className="sidenav" style={{
                width: `${this.state.expanded ? 18 : 3}rem`
            }}>
                <button onClick={() => {
                    this.setState({
                        expanded: !this.state.expanded
                    })
                }}>
                    <Icon className="closebtn" style={{
                        position: "absolute",
                        transform: "translateX(30px)",
                        top: "50%",
                        zIndex: 1000,
                        backgroundColor: "white",
                    }} />
                </button>
            </div>
        )
    }
}



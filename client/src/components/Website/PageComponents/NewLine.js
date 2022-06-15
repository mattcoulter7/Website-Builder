import React from "react";

import {BsFillPlusCircleFill} from 'react-icons/bs'

export default class blah extends React.Component {
    render() {
        return (
            <div style={{
                backgroundColor:"black",
                height:"2px",
                width:"100%",
                display:"flex",
                flexDirection:"column",
                alignItems: 'center'
            }}>
                <button className="btn btn-primary"style={{
                    position:"relative",
                    top:"-20px",
                    zIndex:1000
                }} onClick={() => this.props.onNew()}>
                    <BsFillPlusCircleFill/>
                </button>
            </div>
        );
    }
}
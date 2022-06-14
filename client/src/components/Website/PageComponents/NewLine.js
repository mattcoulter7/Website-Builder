import React from "react";

export default class blah extends React.Component {
    render() {
        return (
            <div style={{
                backgroundColor:"aqua",
                height:"1px",
                width:"100%",
                display:"flex",
                flexDirection:"column",
                alignItems: 'center'
            }}>
                <button style={{
                    backgroundColor:"aqua",
                    borderRadius:"25px",
                    width:"25px",
                    height:"25px",
                    display:"flex",
                    flexDirection:"column",
                    alignItems: 'center',
                    color:"white",
                    position:"relative",
                    top:"-12.5px",
                    border:"none"
                }} onClick={() => this.props.onNew()}>
                    +
                </button>
            </div>
        );
    }
}
import React from "react";

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

export default class blah extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // convert to data structure to inline with grid
        let grid = this.props.children.flat().reduce((prev,curr,i) => {
            let rowIndex = Math.floor(i/this.props.colCount)
            let colIndex = i % this.props.colCount;
            prev[rowIndex] = prev[rowIndex] || new Array(this.props.colCount).fill(null);
            prev[rowIndex][colIndex] = curr;
            return prev;
        },[]);

        
        return (
            <div className="container">
                {grid.map(row => {
                    return (<div key={row._id} className="row">
                        {
                            row.map(col => (
                                <div className="col" style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}>
                                    {col}
                                </div>
                            ))
                        }
                    </div>)
                })}
            </div>
        );
    }
}
import React from "react";
import { Navigate } from 'react-router-dom';
export default class loginForm extends React.Component {
    state = {
        valid:false,
        errorMessage:""
    }
    onSignup() {
        fetch('http://localhost:3001/user',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user:this.state.user,
                password:this.state.password,
                passwordMatch:this.state.passwordMatch,
                userdetails:{
                    firstName:"blah"
                }
            })
        }).then((resp) => {
            return resp.json()   
        })
        .then((json) => {
            this.setState({
                valid: json.valid,
                errorMessage: json.error
            })
        })
    }
    render() {
        if (this.state.valid){
            return <Navigate to='/login' />;
        }
        return (
            <div>
                <h3 className="mb-5">Sign up</h3>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                    <input type="email" id="typeEmailX-2" className="form-control form-control-lg" onChange={(event) => {
                        this.setState({
                            user: event.target.value
                        })
                    }} />
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                    <input type="password" id="typePasswordX-2" className="form-control form-control-lg" onChange={(event) => {
                        this.setState({
                            password: event.target.value
                        })
                    }} />
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="typeConfirmPasswordX-2">Confirm Password</label>
                    <input type="password" id="typeConfirmPasswordX-2" className="form-control form-control-lg" onChange={(event) => {
                        this.setState({
                            passwordMatch: event.target.value
                        })
                    }} />
                </div>

                <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={() => this.onSignup()}>Sign up</button>

                <hr className="my-4" />
                
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
        )
    }
}
import React from "react";
export default class loginForm extends React.Component {
    state = {
        valid:false,
        errorMessage:""
    }
    onSignin() {
        console.log("authenticating")
        fetch(`http://localhost:3001/user?user=${this.state.user}&password=${this.state.password}`, {
            method: "GET",
            credentials: "include"
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                this.setState({
                    valid: json.valid,
                    errorMessage: json.error
                })
            })
    }
    render() {
        return (
            <form>
                <h3 className="mb-5">Sign in</h3>

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

                <div className="form-check d-flex justify-content-start mb-4">
                    <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                    <label className="form-check-label" htmlFor="form1Example3"> Remember password </label>
                </div>

                <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={() => this.onSignin()}>Login</button>

                <hr className="my-4" />

                <p>Don't have an account? <a href="/signup">Sign up</a></p>
            </form>
        )
    }
}
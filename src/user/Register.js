import React, { useState} from 'react';
import {Link} from "react-router-dom";
import Layout from "../core/Layout";
import { register } from "../auth";


const Register = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const {name, email, password, success, error} = values

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value });
    };



    const submitRegistration = (event) => {
        event.preventDefault();
        setValues({...values, error: false });
        register({name, email, password})
            .then(data => {
                if (data.error) {
                    setValues({...values, error: data.error, success: false})
                } else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true
                    })
                }
            })
    };

    const RegisterForm = () => (
        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
            <form className="login100-form validate-form flex-sb flex-w">
                <span className="login100-form-title p-b-32 m-b-70">
                    Register New Account
                </span>
                <span className="txt1 p-b-11">
                    Name
                </span>
                <div className="wrap-input100 validate-input m-b-36">
                    <span className="btn-show-pass">
                        <i className="fa fa-user"></i>
                    </span>
                    <input onChange={handleChange('name')}
                           className="input100"
                           type="text"
                           name="username"
                           value={name}/>
                    <span className="focus-input100"></span>
                </div>
                <span className="txt1 p-b-11">
                    Email
                </span>
                <div className="wrap-input100 validate-input m-b-36">
                    <span className="btn-show-pass">
                        <i className="fa fa-envelope"></i>
                    </span>
                    <input
                        onChange={handleChange('email')}
                        className="input100"
                        type="email"
                        name="email"
                        value={email}/>
                    <span className="focus-input100"></span>
                </div>
                <span className="txt1 p-b-11">
                    Password
                </span>
                <div className="wrap-input100 validate-input m-b-12">
                    <span className="btn-show-pass">
                        <i className="fa fa-eye"></i>
                    </span>
                    <input
                        onChange={handleChange('password')}
                        className="input100"
                        type="password"
                        name="password"
                        value={password}/>
                    <span className="focus-input100"></span>
                </div>
                <div className="w-size25">
                    <button
                        type="submit"
                        onClick={submitRegistration}
                        className="flex-c-m size2 bg1 bo-rad-23 hov1 m-text3 trans-0-4">
                        Register
                    </button>
                </div>

            </form>
        </div>
    );

    const showError = () => (
        <div
            className={"alert alert-danger"} role="alert"
            style={{ display: error ? "" : "none"}}>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span
                aria-hidden="true">&times;</span></button>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className='alert alert-success' style={{ display: success ? "" : "none"}}>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span
                aria-hidden="true">&times;</span></button>
            New Account has been Created Successfully. Please <Link to="/login">Login</Link>
        </div>
    );

    return (
        <Layout title="Register"
                description="New Account Registration" className="container">
            <div className="m-b-200">
                <div className="row">
                    <div className="col-md-8">
                        {showSuccess()}
                        {showError()}
                        {RegisterForm()}
                    </div>
                    <div className="col-md-4">
                        <h1 className="login100-form txt2 p-t-50 m-b-30">
                            Already have An Account? <Link to='/login'>Login</Link>
                        </h1>
                        <img src='../images/loxstore1.jpg' alt='img' />
                    </div>
                </div>
            </div>
        </Layout>
    )
}


export default Register;
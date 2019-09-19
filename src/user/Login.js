import React, { useState} from 'react';
import { Link, Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { login, authenticate, isAuthenticated } from "../auth";


const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        loading: false,
        redirectToReferrer: false,

    });

    const {email, password, loading, error, redirectToReferrer} = values

    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value });
    };



    const submitLogin = (event) => {
        event.preventDefault();
        setValues({...values, error: false, loading: true});
        login({email, password})
            .then(data => {
                if (data.error) {
                    setValues({...values, error: data.error, loading: false})
                } else {
                   authenticate(data,() => {
                           setValues({
                               ...values,
                               redirectToReferrer: true
                           });
                       }
                   );
                }
            });
    };

    const LoginForm = () => (
        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
            <form className="login100-form validate-form flex-sb flex-w">
                <span className="login100-form-title p-b-32 m-b-70">
                    Login
                </span>
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
                        <i className="fa fa-lock"></i>
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
                        onClick={submitLogin}
                        className="flex-c-m size2 bg1 bo-rad-23 hov1 m-text3 trans-0-4">
                        Login
                    </button>
                </div>
                <div className="flex-sb-m w-full p-b-48">
                    <div className="contact100-form-checkbox">
                    </div>
                    <div>
                        <Link to="/forgot-password" className="txt3">
                            Forgot Password?
                        </Link>
                    </div>
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

    const showLoading = () => loading && (
        <div className='alert alert-success'>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span
                aria-hidden="true">&times;</span></button>
            <h2>Loading...</h2>
        </div>
    );

    const redirectUser =  () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to='/admin' />;
            } else {
                return <Redirect to='/user' />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to='/' />;
        }
    }

    return (
        <Layout title="Login"
                description="Login & Start Shopping" className="container">
            <div className="m-b-200">
                <div className="row">
                    <div className="col-md-8">
                        {showLoading()}
                        {showError()}
                        {LoginForm()}
                        {redirectUser()}
                    </div>
                    <div className="col-md-4">
                        <h1 className="login100-form txt2 p-t-50 m-b-30">
                            Don't have An Account yet? <Link to='/register'>Register</Link>
                        </h1>
                        <img src='../images/login.jpg' alt='img' />
                    </div>
                </div>
            </div>
        </Layout>
    );
};


export default Login;
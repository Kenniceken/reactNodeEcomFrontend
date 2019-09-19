import React, {useState } from 'react';
import Layout from "../core/Layout";
import { forgotPassword } from "../auth";
import { Redirect } from "react-router-dom";

const ForgotPassword  = () => {

    const [values, setValues] = useState({
        email: '',
        message: '',
        error: '',
        redirectToLogin: false

    });

    const {
        email,
        message,
        error,
        redirectToLogin,
    } = values;

    const submitForgotPassword = e => {
        e.preventDefault();
        setValues({ message: '', error: ''});
        forgotPassword(email)
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                    setValues({...values, error: data.error})
                } else {
                    console.log(data.message);
                    setValues({
                        ...values,
                        email: data.email,
                        message: data.message,
                        error: false,
                        redirectToLogin: true
                    });
                }
            });
    };

    const handleChange = (email) => event => {
        setValues({email: event.target.value });
        setValues({...values, [email]: event.target.value  });
    };

    const redirectUser = () => {
        if (redirectToLogin) {
            if (!error) {
                return <Redirect to='/login' />
            }
        }
    };

    const forgotPasswordForm = () => (
        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
            <form className='mb-5'>
                <span className="login100-form-title p-b-32 m-b-7">
                    Forgot Password Form
                </span>
                {message && (
                    <h6 className="alert alert-success alert-dismissible mb-5">{message}</h6>
                )}
                {error && (
                    <h6 className="alert alert-danger alert-dismissible ">{error}</h6>
                )}
                <span className="txt1 p-b-11">
                    Email:
                </span>
                <br/><br/>
                <div className="wrap-input100 validate-input m-b-36">
                    <span className="btn-show-pass">
                        <i className="fa fa-envelope"></i>
                    </span>
                    <input
                        onChange={handleChange('email')}
                        className="input100"
                        type="email"
                        name="email"
                        placeholder='Enter Your Email'
                        autoFocus
                        value={email}/>
                    <span className="focus-input100"></span>
                </div>
                <div className="w-size25">
                    <button
                        onClick={submitForgotPassword}
                        type="submit"
                        className="flex-c-m size2 bg1 bo-rad-23 hov1 m-text3 trans-0-4">
                        Send Link
                    </button>
                </div>
            </form>
        </div>
    );

    return (
        <Layout title='Forgotten Password'
                description={`Enter Your Email for  Password Reset Link`} className='container-fluid'>
            <div className="row">
                <div className="col-md-8 offset-md-2 m-b-250 mb-5">
                    {forgotPasswordForm()}
                </div>
            </div>
        </Layout>
    );

};


export default ForgotPassword;

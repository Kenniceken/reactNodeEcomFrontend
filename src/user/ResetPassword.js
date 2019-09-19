import React, { useState} from 'react';
import Layout from "../core/Layout";
import { resetPassword } from "../auth";
import { Redirect } from "react-router-dom";

const ResetPassword = (props) => {
    const [values, setValues] = useState({
        newPassword: '',
        error: false,
        success: false,
        redirectToLogin: false
    });

    const {newPassword, error, success, redirectToLogin} = values;
    const handleChange = (newPassword) => event => {
        setValues({...values, [newPassword]: event.target.value })
    };

    const submitResetPassword = e => {
        e.preventDefault();
        setValues({...values, error: false, success: false, redirectToLogin: false});
        resetPassword({
            newPassword: newPassword,
            resetPasswordLink: props.match.params.resetPasswordToken
        })
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                    setValues({...values, error: data.error})
                } else {
                    console.log(data.success);
                    setValues({...values, success: data.success, newPassword: '', redirectToLogin: true});
                }
            });
    };

    const redirectUser = () => {
        if (redirectToLogin) {
            if (!error) {
                return <Redirect  to='/login'/>
            }
        }
    };


    const resetPasswordForm = () => (
        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
            {success && (
                <h6 className="alert alert-success">{success}</h6>
            )}
            {error && (
                <h6 className="alert alert-warning">{error}</h6>
            )}
            <form className='mb-5'>
                <span className="login100-form-title p-b-32 m-b-7">
                    Reset Password Form
                </span>
                <br/>
                <br/>
                <span className="txt1 p-b-5">
                    New Password:
                </span>
                <br/><br/>
                <div className="wrap-input100 validate-input m-b-36 form-group">
                    <input
                        onChange={handleChange('newPassword')}
                        className="input100 form-control col-md-5"
                        type="password"
                        name="newPassword"
                        placeholder='Enter New Password'
                        value={newPassword}/>
                    <span className="focus-input100"></span>
                </div>
                <div className="w-size25">
                    <button
                        onClick={submitResetPassword}
                        type="submit"
                        className="flex-c-m size2 bg1 bo-rad-23 hov1 m-text3 trans-0-4 btn btn-outline-secondary">
                        Change Password
                    </button>
                </div>
            </form>
        </div>
    );

    return (
        <Layout title='Reset You Password'
                description={`Update and Reset Your Password`} className='container-fluid'>
            <div className="row">
                <div className="col-md-8 offset-md-2 m-b-250 mb-5">
                    {resetPasswordForm()}
                    {redirectUser()}
                </div>
            </div>
        </Layout>
    );
};


export default ResetPassword;
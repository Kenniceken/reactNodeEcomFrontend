import React, {useState, useEffect } from 'react';
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link, Redirect } from "react-router-dom";
import {read, update, updateUser } from "./apiUser";


const Profile = ({match}) => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false
    });

    const {name, email, password, error, success} = values;

    const {token} = isAuthenticated();

    const init = (userId) => {
        //console.log(userId);
        read(userId, token).then(data => {
            if (data.error) {
                setValues({...values, error: true})
            } else {
                setValues({...values,
                    name: data.name,
                    email: data.email
                })
            }
        })
    };


    useEffect(() => {
        init(match.params.userId)
    }, []);

    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value })
    };

    const submitUpdate = (e) => {
        e.preventDefault();
        update(match.params.userId, token, {name, email, password})
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    updateUser(data, () => {
                        setValues({
                            ...values,
                            name: data.name,
                            email: data.email,
                            success: true
                        });
                    });
                }
            });
    };

    const redirectUser = (success) => {
        if (success) {
            return <Redirect to='/'/>
            window.location.reload();
        }
    }


    const profileUpdate = (name, email, password) => (
        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
            <form className="login100-form validate-form flex-sb flex-w">
                <span className="login100-form-title p-b-32 m-b-70">
                    Update Your Profile
                </span>

                <span className="txt1 p-b-11">
                    Name
                </span>
                <div className="wrap-input100 validate-input m-b-36">
                    <span className="btn-show-pass">
                        <i className="fa fa-user-circle-o"></i>
                    </span>
                    <input
                        onChange={handleChange('name')}
                        className="input100"
                        type="text"
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
                        value={password}/>
                    <span className="focus-input100"></span>
                </div>
                <div className="w-size25">
                    <button
                        type="submit"
                        onClick={submitUpdate}
                        className="flex-c-m size2 bg1 bo-rad-23 hov1 m-text3 trans-0-4">
                        Save Changes
                    </button>
                </div>

            </form>
        </div>
    )


    return (
        <Layout title='Profile Page'
                description='Welcome to Your Profile Update Page' className='container-fluid'>
            <div className="row">
                <div className="col-md-8 mx-auto">
                    {profileUpdate(name, email, password)}
                    {redirectUser(success)}
                </div>
            </div>
        </Layout>
    );
};

export default Profile;
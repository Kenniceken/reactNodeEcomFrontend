import React, { useState } from 'react';
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";


const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    // destructure user and token from localStorage
    const { user, token } = isAuthenticated();


    const handleChange = (e) => {
        setError('');
        setName(e.target.value);

    };

    const submitCategoryForm = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        // make request to API in order to create Category
        createCategory(user._id, token, {name})
            .then(data => {
                if (data.error) {
                    setError(true)
                } else {
                    setError('');
                    setSuccess(true);
                }
            });
    };


    const newCategoryForm = () => (
        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
            <form onSubmit={submitCategoryForm} className="login100-form validate-form flex-sb flex-w">
                <span className="login100-form-title p-b-32 m-b-7">
                    Add Category Form
                </span>
                <span className="txt1 p-b-11">
                    Category Name
                </span>
                <div className="wrap-input100 validate-input m-b-36">
                    <input
                        onChange={handleChange}
                        value={name}
                        name="name"/>
                    <span className="focus-input100"></span>
                </div>
                <div className="w-size25">
                    <button
                        type="submit"
                        className="flex-c-m size2 bg1 bo-rad-23 hov1 m-text3 trans-0-4">
                        Create Category
                    </button>
                </div>
            </form>
        </div>
    );

    const showSuccess = () => {
        if (success) {
            return <h3 className='alert alert-success'>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span
                    aria-hidden="true">&times;</span></button>
                {name} has been Created Successfully!!!
            </h3>
        }
    };

    const showError = () => {
        if (error) {
            return <h3 className='alert alert-danger'>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span
                    aria-hidden="true">&times;</span></button>
                Category Name Must be Unique!!!
            </h3>
        }
    };

    const goBackBTN = () => {
        return (
            <div className='mt-5'>
                <Link to='/admin' className='text-info'>Back To Admin Home</Link>
            </div>
        )
    };

    return (
        <Layout title={`Hi ${user.name}`}
                description={`Welcome, You are About to Create A New Category`} className='container-fluid'>
            <div className="row">
                <div className="col-md-8 offset-md-2 m-b-250 mb-5">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBackBTN()}
                </div>
            </div>
        </Layout>
    );
};

export default AddCategory;
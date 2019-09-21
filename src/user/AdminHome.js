import React from 'react';
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";


const AdminHome = () => {

    const { user: {_id, name, email, role} } = isAuthenticated();

    const adminLinks = () => {
        return (
            <div className='card mb-5'>
                <h4 className='card-header'>Admin Links</h4>
                <ul className="list-group">
                    <li className="list-group-item"><Link className='nav-link'  to='/createCategory'>Create Category</Link></li>
                    <li className="list-group-item"><Link className='nav-link'  to='/createProduct'>Create Product</Link></li>
                    <li className="list-group-item"><Link className='nav-link'  to='/admin/products'>Edit Products</Link></li>
                    <li className="list-group-item"><Link className='nav-link'  to='/admin/categories'>Edit Categories</Link></li>
                    <li className="list-group-item"><Link className='nav-link'  to='/orders'>View Orders</Link></li>
                    <li className="list-group-item"><Link className='nav-link'  to={`/profile/${_id}`}>Update Account</Link></li>
                </ul>
            </div>
        );
    };

    const adminInfo = () => {
        return (
            <div className='card mb-5'>
                <h4 className='card-header'>Admin Account Details</h4>
                <ul className="list-group">
                    <li className="list-group-item">Name: {name}</li>
                    <li className="list-group-item">Email: {email}</li>
                    <li className="list-group-item">Account Status: <b><i>{role === 1 ? 'Admin' : 'Verified Account'}</i></b></li>
                </ul>
            </div>
        );
    };


    return (
        <Layout title={`Hi &`}
                description={`Welcome ${name}`} className='container-fluid'>
            <div className="row">
                <div className="col-md-3 m-b-250 mb-5">
                    {adminLinks()}
                </div>
                <div className="col-md-7 m-b-250 mb-5">
                    {adminInfo()}
                </div>
                <div className="col-md-2 m-b-250 mb-5">

                </div>
            </div>
        </Layout>
    );
};

export default AdminHome;
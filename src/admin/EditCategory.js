import React, { useState, useEffect } from 'react';
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import {getAllCategories, deleteCategory} from "./apiAdmin";


const EditCategory = (props) => {

    const [categories, setCategories] = useState([]);

    const {user, token} = isAuthenticated();

    const loadCategories = () => {
        getAllCategories().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setCategories(data)
            }
        });
    };

    const removeCategory = categoryId => {
        deleteCategory(categoryId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                loadCategories()
            }
        });
    };

    useEffect(() => {
        loadCategories()
    }, [props]);

    return (
        <div>
            <Layout title='Manage Product Categories'
                    description='Perform Crud Operations on Product Categories' className='container'>
                <div className="row">
                    <div className="col-md-12 m-b-250 mb-5">
                        <h1>Total Categories: {categories.length}</h1>
                    </div>
                    <div className="col-md-12 mx-auto m-b-250 mb-5">
                        <div className="tableRows" style={{margin: '20px'}}>
                            <table className='table table-hover'>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                { categories.map((c, i) => (
                                    <tr key={i} >
                                        <td><strong>{c.name}</strong></td>
                                        <td>
                                            <Link to={`/admin/category/update/${c._id}`} className='btn btn-outline-success btn-sm'>
                                                <i className='fa fa-edit'></i> Edit
                                            </Link>
                                            &nbsp;&nbsp;&nbsp;
                                            <button className='btn btn-outline-danger btn-sm' onClick={() => removeCategory(c._id)}>
                                                <i className='fa fa-trash'></i> Trash
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export  default EditCategory;
import React, { useState, useEffect } from 'react';
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import {getProducts, deleteProduct} from "./apiAdmin";
import ShowImage from "../core/ShowImage";

const EditProducts = (props) => {

    const [products, setProducts] = useState([]);

    const {user, token} = isAuthenticated()

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setProducts(data)
            }
        })
    };

    const removeProduct = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                loadProducts()
            }
        })
    };

    useEffect(() => {
        loadProducts()
    }, [props])


    return (
        <Layout title='Manage Product'
                description='Perform Crud Operations on Products' className='container'>
            <div className="row">
                <div className="col-md-12 m-b-250 mb-5">
                    <h1>Total Products: {products.length}</h1>
                </div>
                <div className="col-md-12 mx-auto m-b-250 mb-5">
                    <div className="tableRows" style={{margin: '20px'}}>
                        <table className='table table-hover'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                            {products.map((p, i) => (
                                <tr key={i} >
                                    <td><strong>{p.name}</strong></td>
                                    <td  style={{width: '120px', height: '70px'}}><ShowImage item={p} url='product'/></td>
                                    <td>${p.price}</td>
                                    <td>{p.quantity}</td>
                                    <td>
                                        <Link to={`/admin/product/update/${p._id}`} className='btn btn-outline-success btn-sm'>
                                            <i className='fa fa-edit'></i> Edit
                                        </Link>
                                        &nbsp;&nbsp;&nbsp;
                                        <button className='btn btn-outline-danger btn-sm' onClick={() => removeProduct(p._id)}>
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
    );

};


export  default EditProducts;




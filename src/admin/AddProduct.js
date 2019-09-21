import React, { useState, useEffect } from 'react';
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createProduct, getCategories } from "./apiAdmin";


const AddProduct = () => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    // destructure user and token from localStorage
    const { user, token } = isAuthenticated();

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        photo,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;


    // fetch all categories and set formData
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, categories: data, formData: new FormData()
                });
            }
        });
    };




    useEffect(() => {
        init();
    }, []);


    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, [name]: value });
    };


    const submitProductForm = event => {
        event.preventDefault();
        setValues({...values, error: '', loading: true});

        createProduct(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({...values, error: data.error});
                } else {
                    setValues({
                        ...values,
                        name: '',
                        description: '',
                        photo: '',
                        price: '',
                        quantity: '',
                        shipping: '',
                        category: '',
                        loading: false,
                        createdProduct: data.name
                    })
                }
            })
    };

    const newProductForm = () => (
        <div className="wrap-login100 p-l-85 p-r-85 p-t-55 p-b-55">
            <form className='mb-5' onSubmit={submitProductForm}>
                <span className="login100-form-title p-b-32 m-b-7">
                    Add New Product Form
                </span>
                <span className="txt1 p-b-11 mb-5">
                    Product Image
                     <br/><br/>
                </span>
                <div className="">
                    <label className='custom-file' style={{cursor: "pointer"}}>
                        <input type='file' onChange={handleChange('photo')} name='photo' className='custom-file-input' accept='image/*' />
                        <span className='custom-file-control'>Upload Product Image</span>
                    </label>
                </div>
                <br/><br/>
                <span className="txt1 p-b-11">
                    Product Name
                </span>
                <br/><br/>
                <div className="wrap-input100 validate-input m-b-36">
                    <input
                        onChange={handleChange('name')}
                        value={name}
                        className="input100"
                        type="text"
                        required
                        name="name"/>
                </div>
                <span className="txt1 p-b-11">
                    Product Description
                </span>
                <br/><br/>
                <div className="wrap-input100 validate-input m-b-36">
                    <textarea
                        onChange={handleChange('description')}
                        value={description}
                        className="input100"

                        name="description">
                    </textarea>
                </div>
                <span className="txt1 p-b-11">
                    Price
                </span>
                <br/><br/>
                <div className="wrap-input100 validate-input m-b-36">
                    <input
                        onChange={handleChange('price')}
                        value={price}
                        className="input100"
                        type="number"

                        name="price"/>
                </div>
                <span className="txt1 p-b-11">
                    Category
                </span>
                <br/><br/>
                <div className="wrap-input100 validate-input m-b-36">
                    <select
                        onChange={handleChange('category')}
                        className="input100">
                        <option selected='active'>Choose Category</option>
                        {categories && categories.map((c, i) => (
                            <option key={i} value={c._id}>
                                {c.name}
                            </option>
                            )
                        )}
                    </select>
                </div>
                <span className="txt1 p-b-11">
                    Require Shipping
                </span>
                <br/><br/>
                <div className="wrap-input100 validate-input m-b-36">
                    <select
                        onChange={handleChange('shipping')}
                        className="input100">
                        <option selected='active'>Select</option>
                        <option value='0'>No</option>
                        <option value='1'>Yes</option>
                    </select>
                </div>
                <span className="txt1 p-b-11">
                    Quantity
                </span>
                <br/><br/>
                <div className="wrap-input100 validate-input m-b-36">
                    <input
                        onChange={handleChange('quantity')}
                        value={quantity}
                        className="input100"
                        type="number"
                        required
                        name="quantity"/>
                    <span className="focus-input100"></span>
                </div>
                <div className="w-size25">
                    <button
                        type="submit"
                        className="flex-c-m size2 bg1 bo-rad-23 hov1 m-text3 trans-0-4">
                        Create Product
                    </button>
                </div>
            </form>
        </div>
    );


    const showError = () => (
        <div
            className={'alert alert-danger'} role='alert'
            style={{ display: error ? '' : 'none'}}>
            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span
                aria-hidden="true">&times;</span></button>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className='alert alert-success'
             style={{ display: createdProduct ? '' : 'none'}}>
            <h2>{`${createdProduct}`} has been Created Successfully. </h2>
        </div>
    );

    const showLoading = () => loading && (
        <div className='alert alert-success'>
            <h3>Loading....</h3>
        </div>
    );



    const goBackBTN = () => {
        return (
            <div className='mt-5'>
                <Link to='/admin/products' className='text-info'>Back To Admin Home</Link>
            </div>
        )
    }

    return (
        <Layout title={`Hi ${user.name}`}
                description={`Welcome, You are About to Create A New Product`} className='container-fluid'>
            <div className="row">
                <div className="col-md-8 offset-md-2 m-b-250 mb-5">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newProductForm()}
                    {goBackBTN()}
                </div>
            </div>
        </Layout>
    );
};


export default AddProduct;
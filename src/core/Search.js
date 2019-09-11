import React, { useState, useEffect } from 'react';
//import { Link } from "react-router-dom";
import { getCategories, searchList } from "./apiCore";
//import Menu from "./Menu";
import Card from "./Card";


const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        error: '',
        results: [],
        searched: false
    });

    const { categories, category, search, results, searched } = data;

    const loadCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setData({...data, categories: data});
            }
        });
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const searchedData = () => {
        //console.log(search, category);
        if (search) {
            searchList({search: search || undefined, category: category})
                .then(response => {
                    if (response.error) {
                        console.log(response.error)
                    } else {
                        setData({...data, results: response, searched: true})
                    }
                });
        }
    };

    const searchFormSubmit = (e) => {
        e.preventDefault();
        searchedData()
    };

    const handleChange = (name) => (event) => {
        setData({...data, [name]: event.target.value, searched: false});
    };


    const searchMessage = (search, results) => {
        if (searched && results.length > 0) {
            return (
                <div className='alert alert-success alert-dismissible fade show' role='alert' data-auto-dismiss='5000'>
                    {results.length} Product (s) Found
                </div>

            );
        };



        if (searched && results.length < 1) {
            return (
                <div className='alert alert-danger alert-dismissible fade show' role='alert' data-auto-dismiss='5000'>
                    No Product Found
                </div>
            );
        };
    };

    const searchedProducts = (results = []) => {
        return (
        <section className="lexstore-shop feature_product_area section_gap_bottom_custom">
           <div className="container">
               <h2 className='mt-4 mb-4 text-muted'>
                   {searchMessage(searched, results)}
               </h2>
              <div className='row'>
                    {results.map((product, i) => (<Card key={i} product={product} />))}
               </div>
            </div>
         </section>
        )
    }

    const searchForm = () => {
        return (
            <div>
                <form onSubmit={searchFormSubmit}>
                    <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-4">
                        <div className="input-group">
                            <div className='input-group-prepend inputSelect'>
                                <select className='btn mr-2' onChange={handleChange('category')}>
                                    <option value='All'>Categories</option>
                                    {categories.map((c, i) => (<option key={i} value={c._id}>{c.name}</option>))}
                                </select>
                            </div>
                            <input
                                type="search"
                                placeholder="Search for Products..."
                                aria-describedby="button-addon1"
                                className="form-control border-0 bg-light"
                                onChange={handleChange('search')}
                            />
                            <div className="input-group-append">
                                <button id="button-addon1" type="submit" className="btn btn-link text-secondary">
                                    <i className="fa fa-search"></i></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }


    return (
        <div>
            <div className='container'>
                <div className="row">
                    <div className="col-lg-8 mx-auto">
                        <div className="rounded">
                            {searchForm()}
                        </div>
                    </div>
                </div>
            </div>
            {searchedProducts(results)}
        </div>
    );
}


export default Search;
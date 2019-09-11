import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
//import Layout from "./Layout";
import Menu from "./Menu";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import {prices} from "./FixedPrices";
import Card from "./Card";
import ShopCard from "./ShopCard";


const Shop = () => {

    const [mainFilters, setMainFilters] = useState({
        filters: { category: [], price: [] }
    })

    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setCategories(data)
            };
        });
    };

    const loadFilteredResults = (newFilters) => {
        //console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0)
            }
        })
    };

    const loadMoreProducts = () => {
        let toSkip = skip + limit;
        //console.log(newFilters);
        getFilteredProducts(toSkip, limit, mainFilters.filters).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMoreProducts} className='loadMoreBtn mb-5'>
                    <span>Load More...</span>
                </button>
            )
        );
    }

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, mainFilters.filters);
    }, []);

    const handelFilters = (filters, filterBy) => {
        //console.log('Shop', filters, filterBy);
        const newMainFilters = {...mainFilters}
        newMainFilters.filters[filterBy] = filters;

        if (filterBy === 'price') {
            let priceValues = handlePrice(filters);
            newMainFilters.filters[filterBy] = priceValues;
        }

        loadFilteredResults(mainFilters.filters);

        setMainFilters(newMainFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };



    return (
        <div>
            <Menu/>
            <section className="banner_area mb-5">
                <div className="banner_inner d-flex align-items-center" style={{backgroundImage: 'url(images/blog-05.jpg)'}}>
                    <div className="container">
                        <div className="banner_content d-md-flex justify-content-between align-items-center">
                            <div className="mb-3 mb-md-0">
                                <h2 style={{color: '#fff'}}>Shop By Category</h2>
                                <p style={{color: '#fff'}}>Experience our Wide Range of Product by Category</p>
                            </div>
                            <div className="page_link ">
                                <Link to="/" style={{color: '#fff'}} target="_parent">Home</Link>
                                <Link to="/shop" style={{color: '#fff'}}>Shop</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="cat_product_area section_gap">
                <div className="container shopContainer">
                    <div className="row flex-row-reverse">
                        <div className="col-lg-9">
                            <div className="sec-title p-b-60">
                                <h5 className="m-text5 t-center">
                                    Featured Products
                                </h5>
                            </div>
                            <div className='row'>
                                {filteredResults.map((product, i) => (<ShopCard key={i} product={product} />
                                ))}
                            </div>
                            <hr/>
                            {loadMoreButton()}
                        </div>

                        <div className="col-lg-3 mb-5">
                            <div className="left_sidebar_area">
                                <aside className="left_widgets p_filter_widgets">
                                    <div className="l_w_title">
                                        <h3 className='text-center'>Filter By Categories</h3>
                                    </div>
                                    <div className="widgets_inner">
                                        <ul>
                                            <Checkbox
                                                categories={categories}
                                                handleFilters={filters =>
                                                    handelFilters(filters,'category')}
                                            />
                                        </ul>
                                    </div>
                                </aside>
                                <aside className="left_widgets p_filter_widgets">
                                    <div className="l_w_title">
                                        <h3 className='text-center'>Filter By Prices</h3>
                                    </div>
                                    <div className="widgets_inner">

                                            {/*<label className="radio">*/}
                                            {/*    <input type="radio" name="r" value="1" checked />*/}
                                            {/*    <span>$0 to $10 </span>*/}
                                            {/*</label>*/}
                                       <RadioBox
                                           prices={prices}
                                           handleFilters={filters =>
                                               handelFilters(filters,'price')}
                                       />

                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );

};

export default Shop;
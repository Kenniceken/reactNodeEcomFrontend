import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getProducts } from "./apiCore";
import Menu from "./Menu";
import Card from "./Card";
import Search from "./Search";

const Home = () => {

    const [productsBySell, setProductBySell] = useState([]);
    const [productsByArrival, setProductByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductBySell(data);
            }
        });
    };


    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);


    return (
       <div>
           <Menu/>
           <section className="slide1">
               <div className="wrap-slick1">
                   <div className="slick1">
                       <div className="item-slick1 item1-slick1"
                            style={{backgroundImage: 'url(images/blog-04.jpg)'}}>
                           <div className="wrap-content-slide1 sizefull flex-col-c-m p-l-15 p-r-15 p-t-150 p-b-170">
                                <span className="caption1-slide1 m-text1 t-center animated visible-false m-b-15"
                                      data-appear="fadeInDown">
                                  Women Collection 2020
                                </span>
                               <h2 className="caption2-slide1 xl-text1 t-center animated visible-false m-b-37"
                                   data-appear="fadeInUp">
                                   New arrivals
                               </h2>

                               <div className="wrap-btn-slide1 w-size1 animated visible-false" data-appear="zoomIn">
                                   <Link to="/shop"
                                      className="flex-c-m size2 bo-rad-23 s-text2 bgwhite hov1 trans-0-4">
                                       Shop Now
                                   </Link>
                               </div>
                           </div>
                       </div>
                       <div className="item-slick1 item2-slick1"
                             style={{backgroundImage: 'url(images/blog-05.jpg)'}}
                           >
                           <div className="wrap-content-slide1 sizefull flex-col-c-m p-l-15 p-r-15 p-t-150 p-b-170">
                            <span className="caption1-slide1 m-text1 t-center animated visible-false m-b-15"
                                  data-appear="rollIn">
                              Men Collection 2020
                            </span>

                               <h2 className="caption2-slide1 xl-text1 t-center animated visible-false m-b-37"
                                   data-appear="lightSpeedIn">
                                   On Sale
                               </h2>

                               <div className="wrap-btn-slide1 w-size1 animated visible-false" data-appear="slideInUp">
                                   <Link to="/shop"
                                      className="flex-c-m size2 bo-rad-23 s-text2 bgwhite hov1 trans-0-4">
                                       Shop Now
                                   </Link>
                               </div>
                           </div>
                       </div>
                       <div className="item-slick1 item3-slick1"
                            style={{backgroundImage: 'url(images/blog-06.jpg)'}}>
                           <div className="wrap-content-slide1 sizefull flex-col-c-m p-l-15 p-r-15 p-t-150 p-b-170">
                            <span className="caption1-slide1 m-text1 t-center animated visible-false m-b-15"
                                  data-appear="rotateInDownLeft">
                              Women Collection 2020
                            </span>

                               <h2 className="caption2-slide1 xl-text1 t-center animated visible-false m-b-37"
                                   data-appear="rotateInUpRight">
                                   New arrivals
                               </h2>

                               <div className="wrap-btn-slide1 w-size1 animated visible-false" data-appear="rotateIn">
                                   <a href="/shop"
                                      className="flex-c-m size2 bo-rad-23 s-text2 bgwhite hov1 trans-0-4">
                                       Shop Now
                                   </a>
                               </div>
                           </div>
                       </div>

                   </div>
               </div>
           </section>

           <section className="feature-area section_gap_bottom_custom">
               <div className="container">
                   <div className="row pt-3">
                       <div className="col-lg-3 col-md-6">
                           <div className="single-feature">
                               <Link to="/" className="title">
                                   <i className="flaticon-money"></i>
                                   <h3 className='text-muted'>Money back Guarantee</h3>
                               </Link>
                           </div>
                       </div>
                       <div className="col-lg-3 col-md-6">
                           <div className="single-feature">
                               <Link to="/" className="title">
                                   <i className="flaticon-truck"></i>
                                   <h3 className='text-muted'>Free Same City Delivery</h3>
                               </Link>
                           </div>
                       </div>
                       <div className="col-lg-3 col-md-6">
                           <div className="single-feature">
                               <Link to="/" className="title">
                                   <i className="flaticon-support"></i>
                                   <h3 className='text-muted'>24/7 Online Support</h3>
                               </Link>
                           </div>
                       </div>
                       <div className="col-lg-3 col-md-6">
                           <div className="single-feature">
                               <Link to="/" className="title">
                                   <i className="flaticon-blockchain"></i>
                                   <h3 className='text-muted'>Secure Online Payment</h3>
                               </Link>
                           </div>
                       </div>
                   </div>
               </div>
           </section>
           <Search/>
           <section className="lexstore-shop feature_product_area section_gap_bottom_custom">
               <div className="container">
                   <div className="row justify-content-center mb-5">
                       <div className="col-md-12 text-center lexstore-heading">
                           <h2><span>New Arrival</span></h2>
                           <br/>
                           <p className='lexstore-headingP'>We love to tell our successful far far away, behind the word mountains, far from the countries Ghana and Senegal, there                             live the blind texts.
                           </p>
                       </div>
                   </div>
                       <div className='row mb-5'>
                           {productsByArrival.map((product, i) => (<Card key={i} product={product} />
                           ))}
                       </div>
                   <div className="row justify-content-center mb-5">
                       <div className="col-md-12 text-center lexstore-heading">
                           <h2><span>On Sale</span></h2>
                           <br/>
                           <p className='lexstore-headingP'>We love to tell our successful far far away, behind the word mountains, far from the countries Ghana and Senegal, there                             live the blind texts.
                           </p>
                       </div>
                   </div>
                       <div className='row'>
                           {productsBySell.map((product, i) => (<Card key={i} product={product} />
                           ))}
                       </div>
               </div>
           </section>
       </div>
    );
}


export default Home;
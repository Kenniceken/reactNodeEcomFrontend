import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { readProduct, listRelateProducts } from "./apiCore";
import Card from "./Card";
import Layout from "./Layout";
import ShowImage from "./ShowImage";
import moment from "moment";
import Carousel from "react-multi-carousel";
import {addItem, getCartItems} from "./CartHelpers";


const Product = (props) => {

    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const fetchSingleProduct = productId => {
        readProduct(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related Products
                listRelateProducts(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                })
            }
        });
    };

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true)
        });
    };


    useEffect(() => {
        const productId = props.match.params.productId
        fetchSingleProduct(productId);
    }, [props]);

    const showAddToCartButton = () => (
        <Link className="main_btn" onClick={addToCart}>
            <i className="fa fa-shopping-cart"></i> Add To Cart
        </Link>
    );

    const showStock = (quantity) => {
        return quantity > 0 ? (
            <span className=' badge badge-secondary badge-pill'>In Stock</span>
        ) : (
            <span className=' badge badge-secondary badge-pill'>Out Of Stock</span>
        );
    };

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        }
    };

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />;
        }
    };




    return (
        <div>
        <Layout title={product && product.name}
                description="" className="container" style={{color: ""}}>
            <div className="m-b-200">
                <h2 className='mb-4'>Product Details for {product.name}</h2>
                <div className="row m-b-150">
                    <div className="col-md-10">
                        <div className="bread-crumb bgwhite flex-w p-l-52 p-r-15 p-t-30 p-l-15-sm">
                            <Link to="/" target="_parent" className="s-text16">
                                Home
                                <i className="fa fa-angle-right m-l-8 m-r-9" aria-hidden="true"></i>
                            </Link>
                            <Link to="/shop" target="_parent" className="s-text16">
                                Shop
                                <i className="fa fa-angle-right m-l-8 m-r-9" aria-hidden="true"></i>
                            </Link>
                            <small>{product.name}</small>
                        </div>

                        <div className="product_image_area m-b-20">
                            <div className="container">
                                <div className="row s_product_inner">
                                    <div className="col-lg-6">
                                        <div className="s_product_img">
                                            <div id="carouselExampleIndicators" className="carousel slide"
                                                data-ride="carousel">
                                                <div className="carousel-inner">
                                                    <div className="carousel-item active">
                                                        <ShowImage item={product} url='product' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-5 offset-lg-1">
                                        <div className="s_product_text">
                                            <h3>{product.name}</h3>
                                            <h2>${product.price}</h2>
                                            <ul className="list">
                                                <li>
                                                   Category: {product.category && product.category.name}
                                                </li>
                                                <li>
                                                    <span>Availability</span> : {showStock(product.quantity)}
                                                </li>
                                                <li><small>Added {moment(product.createdAt).fromNow()}</small></li>
                                            </ul>
                                            <p>
                                                {product.description}
                                            </p>
                                            <div className="card_area">
                                                {showAddToCartButton()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-2">
                    </div>
                </div>
            </div>
        </Layout>
            <div className='m-b-250'>
                <section className="newproduct bgwhite p-t-15 p-b-55">
                    <div className="container">
                        <div className="sec-title p-b-60">
                            <h3 className="m-text5 t-center">
                                Related Products
                            </h3>
                        </div>
                        <Carousel
                            swipeable={true}
                            draggable={false}
                            focusOnSelect
                            showDots
                            //shouldShowDots={true}
                            responsive={responsive}
                            ssr={true}
                            keyBoardControl={true}
                            slidesToSlide={2}
                            infinite={true}
                            autoPlaySpeed={1000}
                            animationSpeed={100}
                            customTransition='all 2.5'
                            transitionDuration={5000}

                        >
                            {relatedProduct.map((product, i) => (
                                <div className="item-slick2 p-l-15 p-r-15" key={i} product={product}>
                                    <div className="block2">
                                        <div className="block2-img wrap-pic-w of-hidden pos-relative">
                                            {shouldRedirect(redirect)}
                                            <ShowImage item={product} url='product'/>
                                            <div className="block2-overlay trans-0-4">
                                                <Link to="/" className="block2-btn-addwishlist hov-pointer trans-0-4">
                                                    <i className="icon-wishlist icon_heart_alt" aria-hidden="true"></i>
                                                    <i className="icon-wishlist icon_heart dis-none"
                                                       aria-hidden="true"></i>
                                                </Link>
                                                <div className="block2-btn-addcart w-size1 trans-0-4">
                                                    <button
                                                        className="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4">
                                                        <Link
                                                            to={`/product/${product._id}`}
                                                            style={{ color: '#fff', textDecoration: 'none', fontFamily: 'Exo 2'}}>
                                                            <i className="ti-eye"></i>   View Product
                                                        </Link>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="block2-txt p-t-20">
                                            <Link to={`/product/${product._id}`}
                                               className="block2-name dis-block s-text3 p-b-5">
                                                {product.name}
                                            </Link>
                                            <span className="block2-price m-text6 p-r-5">
                                                $ {product.price}
                                             </span>
                                            <br/>
                                            <span className="block2-price m-text6 p-r-5">
                                                <h6><small style={{fontSize:'10px', fontStyle: 'normal'}}>Category: {product.category && product.category.name}</small></h6>
                                             </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </section>
            </div>
      </div>
    );
}

export default Product;
import React from 'react';
import { Link } from "react-router-dom";
import ShowImage from "./ShowImage";
//import moment from "moment";

const CardRelatedProduct = ({product}) => {
    return (
        <div>
            <div className="block2-img wrap-pic-w of-hidden pos-relative block2-labelnew">
                <img src="images/item-02.jpg" alt="IMG-PRODUCT"/>
                <div className="block2-overlay trans-0-4">
                    <a href="#" className="block2-btn-addwishlist hov-pointer trans-0-4">
                        <i className="icon-wishlist icon_heart_alt" aria-hidden="true"></i>
                        <i className="icon-wishlist icon_heart dis-none" aria-hidden="true"></i>
                    </a>
                    <div className="block2-btn-addcart w-size1 trans-0-4">
                        <button className="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            <div className="block2-txt p-t-20">
                <a href="product-detail.html" className="block2-name dis-block s-text3 p-b-5">
                    Herschel supply co 25l
                </a>
                <span className="block2-price m-text6 p-r-5">
									        $75.00
								        </span>
            </div>
        </div>
    );

};


export default CardRelatedProduct;
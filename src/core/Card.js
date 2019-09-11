import React, {useState} from 'react';
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
//import moment from "moment";
import {addItem} from "./CartHelpers";


const Card = ({product}) => {

    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);



    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true)
        });
    };

    const showAddToCartButton = () => (
        <a onClick={addToCart}>
            <i className="fa fa-shopping-cart"></i>
        </a>
    );



    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />;
        }
    };

    // const handleChange = productId => event => {
    //     setCount(event.target.value < 1 ? 1 : event.target.value);
    //     if (event.target.value >= 1) {
    //         updateItem(productId, event.target.value);
    //     }
    // };

    return (
        <div className="col-lg-3 col-sm-6 name">
            <div className="single-product">
                <div className="product-img">
                    {shouldRedirect(redirect)}
                    <ShowImage item={product} url='product' />
                    <div className="p_icon">
                        <Link to={`/product/${product._id}`}   data-toggle="tooltip" data-placement="top" title="View Product">
                            <i className="ti-eye"></i>
                        </Link>
                        {showAddToCartButton()}
                    </div>
                </div>
                <div className="product-btm">
                    <Link to="#" className="d-block">
                        <h4>{product.name}</h4>
                    </Link>
                    <div className="mt-3">
                        <span className="mr-4">$ {product.price}</span>
                    </div>
                    <div className="mt-3">
                        <h6 className="mr-4"><small>Category: {product.category && product.category.name}</small></h6>
                        {/*<p className='black-8'><small>Added on {moment(product.createdAt).fromNow()}</small></p>*/}
                    </div>
                </div>
            </div>
        </div>
    );

};


export default Card;
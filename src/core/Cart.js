import React, { useState, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom";
import { getProducts } from "./apiCore";
import Menu from "./Menu";
import {getCartItems, updateItem, removeItem} from "./CartHelpers";
import ShowImage from "./ShowImage";
import Checkout from "./Checkout";
import {isAuthenticated} from "../auth";
import {getBraintreeClientToken, processPayment, createOrder} from "./apiCore";
import DropIn from 'braintree-web-drop-in-react';
import {emptyCart} from "./CartHelpers";


const Cart = (product, props) => {
    const [items, setItems] = useState([]);
    const [count, setCount] = useState(product.count);
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        address: ''
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const getToken = (userId, token) => {
        getBraintreeClientToken(userId, token).then(data => {
            if (data.error) {
                setData({...data, error: data.error});
            } else {
                setData({clientToken: data.clientToken});
            }
        });
    };


    useEffect(() => {
        setItems(getCartItems());
        getToken(userId, token);
    }, [props, count]);

    const getTotal = () => {
        return items.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };


    const showPaymentError = error => (
        <div className='alert alert-danger' style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    );

    let deliveryAddress = data.address;


    const payNow = () => {
        setData({loading: true});
        // send the nonce to the server
        // nonce here means = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
            .then(data => {
               // console.log(data);
                nonce = data.nonce;

                // once you have nonce (e.g card type, card number), send nonce as 'paymentMethodNonce'
                // to the backend and also total to be charged
                // console.log('send nonce and total to process: ', nonce, getTotal(items));

                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(items)
                };
                processPayment(userId, token, paymentData)
                    .then(response => {
                        console.log(response);

                        // empty cart
                        // create Order

                        const createOrderData =  {
                            items: items,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            address: deliveryAddress
                        };

                        createOrder(userId, token, createOrderData)
                            .then(response => {
                                emptyCart(() => {
                                    console.log("Payment Success and empty cart");
                                    window.location.reload();
                                });
                                setData({loading: false, success: response.success});
                            })
                            .catch(error => {
                                console.log(error);
                                setData({ loading: false });
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        setData({ loading: false });
                    });
            })
            .catch(error => {
                // console.log("dropin error: ", error);
                setData({ ...data, error: error.message });
            });
    };

    const showPaymentSuccess = success => (
        <div className='alert alert-success' style={{display: success ? '' : 'none'}} role='alert'>
            Payment Accepted!! .. Your payment is Successful and Your Order is being Processed!!.
        </div>
    );

    const showLoading = loading => loading && <div>
        <img src="../images/icons/ajax-loader.gif" alt="Loading" style={{width:'140px', height:'140px'}}/>
    </div>;

    const handleAddress = event => {
        setData({...data, address: event.target.value});
    };


    const showDropIn = () => (
        <div onBlur={() => setData({...data, error: ''})}>
            {data.clientToken !== null && items.length > 0 ? (
                <div className='m-b-250'>
                    <div className='form-group mb-3'>
                        <label className='text-muted text-monospace'>Deliver Address:</label>
                        <textarea
                            onChange={handleAddress}
                            className='form-control' value={data.address}
                            placeholder='Please Enter Your Preferred Delivery Address ...'>

                        </textarea>
                    </div>
                    <DropIn options={{
                        authorization: data.clientToken,
                        paypal: {
                            flow: "vault"
                        }
                    }}
                            onInstance={instance => (data.instance = instance)} />
                    <div className="size10 trans-0-4 m-t-10 m-b-10">
                        <button onClick={payNow} className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4 btn-block">
                           Pay Now
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );

    const showCartItems = items => {
        return items.length > 0 ? (
            <div>
                <h2>You have {`${items.length}`} Item(s) in Your Shopping Cart</h2>
                <hr/>
            </div>
        ) : (
            <div>
                <h2>You have {`${items.length}`} Item(s) in Your Shopping Cart</h2>
                <hr/>
                <Link to='/shop' className="btn btn-outline-secondary shopNow">
                Shop Now
                </Link>
            </div>
        )
    };

    const showCheckout = () => {
        return isAuthenticated() ? (
            <div>{showDropIn()}</div>
        ) : (
            <div className="size10 trans-0-4 m-t-10 m-b-10">
                <Link to='/login' className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4" style={{textDecoration: 'none'}}>
                    Login to Checkout
                </Link>
            </div>
        )
    }

    const showAddressCouponCheckout = (items) => {
        return items.length > 0 ? (
            <div>
                <div className="flex-w flex-sb-m p-t-25 p-b-25 bo8 p-l-35 p-r-60 p-lr-15-sm">
                    <div className="flex-w flex-m w-full-sm">
                        <div className="size11 bo4 m-r-10">
                            <input className="sizefull s-text7 p-l-22 p-r-22" type="text" name="coupon-code"
                                   placeholder="Coupon Code"/>
                        </div>
                        <div className="size12 trans-0-4 m-t-10 m-b-10 m-r-10">
                            <button className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4">
                                Apply Coupon
                            </button>
                        </div>
                    </div>
                    <div className="size10 trans-0-4 m-t-10 m-b-10">
                        <Link to='/shop' className="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4" style={{textDecoration: 'none'}}>
                            Continue Shopping
                        </Link>
                    </div>
                </div>
                <div className="bo9 w-size28 p-l-40 p-r-40 p-t-30 p-b-38 m-t-30 m-r-0 m-l-auto p-lr-15-sm">
                    <h5 className="m-text20 p-b-24">
                        Cart Totals
                    </h5>
                    <div className="flex-w flex-sb-m p-b-12">
                            <span className="s-text18 w-size19 w-full-sm">
                                Subtotal:
                            </span>

                        <span className="m-text21 w-size20 w-full-sm">
                                <Checkout products={items} />
                            </span>
                    </div>
                    <div className="flex-w flex-sb-m p-t-26 p-b-30">
                            <span className="m-text22 w-size19 w-full-sm">
                                Total:
                            </span>
                        <span className="m-text21 w-size20 w-full-sm">
                            <b><strong><Checkout products={items} /></strong></b>
                        </span>
                    </div>
                    {showLoading(data.loading)}
                    {showPaymentSuccess(data.success)}
                    {showPaymentError(data.error)}
                    <div className="size50 trans-0-4">
                        {showCheckout()}
                    </div>
                </div>
            </div>
        ) : (
            <div>
            </div>
        )
    };

    const showTableHeader = (items) => {
        return items.length > 0 ? (
            <tr className="table-head">
                <th className="column-1"></th>
                <th className="column-2">Product</th>
                <th className="column-3">Price</th>
                <th className="column-4 p-l-70">Quantity</th>
                <th className="column-5">Total</th>
                <th className="column-5">Remove</th>
            </tr>
        ) : (
            <div></div>
        )
    };




    const showStock = (quantity) => {
        return quantity > 0 ? (
            <span className=' badge badge-secondary badge-pill'>In Stock</span>
        ) : (
            <span className=' badge badge-secondary badge-pill'>Out Of Stock</span>
        );
    };

    const noItemsMessage = () => (

        <h2 className='mb-4'>You do not have any Item in Your Cart
                    <br/>
                    <br/>
        <Link to='/shop' className="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4 col-sm-2">Shop Now</Link> </h2>

    );


    const handleChange = (productId) => event => {
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1)  {
            updateItem(productId, event.target.value);
        }
    }

    const showCartUpdateOptions = (product) =>{
        return (
                <div className=" input-group">
                    <div className='input-group-prepend'>
                        <span className='input-group-text'><small>Update Quantity</small></span>
                    </div>
                    <input type="number" className='form-control' value={product.count} onChange={handleChange(product._id)} />
                </div>
        );
    };


    const showRemoveItemButton = (product) => {
        return (
            <button onClick={() => [removeItem(product._id), window.location.reload()]}>
                <i
                    className='fa fa-trash-o text-danger'
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Remove Item"
                />
            </button>
        );
    };



    return  (
        <div>
            <Menu/>
            <section className="banner_area mb-5">
                <div className="banner_inner d-flex align-items-center" style={{backgroundImage: 'url(images/blog-06.jpg)'}}>
                    <div className="container">
                        <h2 className="l-text2 t-center">
                           Shopping Cart
                        </h2>
                    </div>
                </div>
            </section>
            <section className="cart bgwhite p-t-70 p-b-100">
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-10 mx-auto mb-5'>
                            <h2>{showCartItems(items)}</h2>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="container-table-cart pos-relative">
                        <div className="wrap-table-shopping-cart bgwhite">
                            <table className="table-shopping-cart"  >
                             <tbody>
                             {showTableHeader(items)}
                             {items.map((product, i) => (
                             <tr className="table-row"  key={i} product={product}>
                                 <td className="column-1">
                                     <Link to={`/product/${product._id}`} >
                                         <div className="cart-img-product b-rad-4 o-f-hidden">
                                             <ShowImage item={product} url='product' />
                                         </div>
                                     </Link>
                                 </td>
                                 <td className="column-2">
                                     <Link to={`/product/${product._id}`} className='text-muted'>
                                         {product.name}
                                     </Link>
                                 </td>
                                 <td className="column-3">${product.price}</td>
                                 <td className="column-4">
                                     {showCartUpdateOptions(product)}
                                 </td>
                                 <td className="column-5">${product.price * product.count}</td>
                                 <td className="text-center">
                                     {showRemoveItemButton(product)}
                                 </td>
                             </tr>
                             ))}
                             </tbody>
                            </table>
                        </div>
                    </div>
                    {showAddressCouponCheckout(items)}
                </div>
            </section>
        </div>
    );
}

export default Cart;
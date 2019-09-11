import React, { useState, useEffect } from 'react';
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { listOrders, getOrderStatusValues, updateOrderStatus } from "./apiAdmin";
import moment from "moment";


const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [orderStatusValues, setOrderStatusValues] = useState([]);

    const {user, token} = isAuthenticated();

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setOrders(data)
            }
        })
    };

    const loadOrderStatusValues = () => {
        getOrderStatusValues(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setOrderStatusValues(data)
            }
        })
    };

    useEffect(() => {
        loadOrders();
        loadOrderStatusValues();
    }, [])

    const showNoOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h1 className='text-info ordersList mb-5'>Total Orders: {orders.length} </h1>
            )
        } else {
            return <h1 className='text-danger'>No Orders at the Moment....!!!</h1>
        }
    };

    const showInput = (key, value) => (
        <div className='input-group mb-2 mr-sm-2'>
            <div className="input-group-prepend">
                <div className="input-group-text">
                    {key}
                </div>
            </div>
            <input type="text" value={value} className='form-control' readOnly/>
        </div>
    );

    const handleOrderStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(
            data => {
                if (data.error) {
                    console.log("Status update failed");
                } else {
                    loadOrders();
                }
            }
        );
    };

    const showOrderStatus = o => (
        <div className='form-group col-sm-4'>
            <h2 className='mark mb-2 orderStatusMain'>Order Status: <b><strong>{o.status}</strong></b></h2>
            <select className='form-control' onChange={e => handleOrderStatusChange(e, o._id)}>
                <option>Update Order Status</option>
                {orderStatusValues.map((status, index) => (<option key={index} value={status}>
                    {status}
                </option>))}
            </select>
        </div>
    )

    return (
        <Layout title='List of Orders'
                description={`Here are the List of Customer Orders`} className='container-fluid'>
            <div className="row">
                <div className="col-md-8 offset-md-2 m-b-250 mb-5">
                    {showNoOrdersLength()}
                    {orders.map((o, oIndex) => {
                        return (
                            <div className='mb-5' key={oIndex} style={{ borderBottom: '4px solid #e65540'}}>
                                <h2 className='mb-5'>
                                    <span className='bg-light orderID'>
                                        Order ID: {o._id}
                                    </span>
                                </h2>
                                <ul className="list-group mb-2 orderDetails">
                                    <li className="list-group-item">Order Status: {showOrderStatus(o)}</li>
                                    <li className="list-group-item">Transaction ID: {o.transaction_id}</li>
                                    <li className="list-group-item">Amount: ${o.amount}</li>
                                    <li className="list-group-item">Customer Name: {o.user.name}</li>
                                    <li className="list-group-item">Order Date: {moment(o.createdAt).fromNow()}</li>
                                    <li className="list-group-item">Delivery Address: {o.address}</li>
                                </ul>
                                <h3 className='mt-4 mb-4 font-italic'>
                                    Total Items in the Order: {o.items.length}
                                </h3>
                                {o.items.map((i, iIndex) => (
                                    <div className='mb-4' key={iIndex} style={{padding: '2rem', border: '1px solid #e65540'}}>
                                        {showInput('Item Name', i.name)}
                                        {showInput('Item Price', i.price)}
                                        {showInput('Item Total', i.count)}
                                        {showInput('Item ID', i._id)}
                                    </div>
                                ))}
                            </div>
                        )
                    })}
                </div>
            </div>
        </Layout>
    );
};



export default Orders;
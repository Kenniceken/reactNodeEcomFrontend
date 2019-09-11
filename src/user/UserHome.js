import React, {useState, useEffect} from 'react';
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getOrderHistory } from "./apiUser";
import moment from "moment";

const UserHome = () => {
    const [history, setHistory] = useState([]);

    const { user: {_id, name, email, role} } = isAuthenticated();

    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getOrderHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHistory(data)
            }
        })
    };

    useEffect(() => {
        init(_id, token)
    }, [])

    const userLinks = () => {
        return (
            <div className='card mb-5'>
                <h4 className='card-header'>User Links</h4>
                <ul className="list-group">
                    <li className="list-group-item"><Link className='nav-link'  to='/user/password'>Change Password</Link></li>
                    <li className="list-group-item"><Link className='nav-link'  to={`/profile/${_id}`}>Update Account</Link></li>
                    <li className="list-group-item"><Link className='nav-link'  to='/profile/address'>Shipping Address</Link></li>
                    <li className="list-group-item"><Link className='nav-link'  to='/order/'>View Order History</Link></li>
                </ul>
            </div>
        );
    };

    const userInfo = () => {
        return (
            <div className='card mb-5'>
                <h4 className='card-header'>Account Details</h4>
                <ul className="list-group">
                    <li className="list-group-item">Name: {name}</li>
                    <li className="list-group-item">Email: {email}</li>
                    <li className="list-group-item">Role: <b><i>{role === 1 ? 'Admin' : 'Verified Account'}</i></b></li>
                </ul>
            </div>
        );
    };

    const orderHistory = (history) => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">Order history</h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    {h.items.map((p, i) => {
                                        return (
                                            <div key={i} className='mb-3 orderItemHistory'>
                                                <p>Item name: <span>{p.name}</span></p>
                                                <p>Item price: <span>${p.price}</span></p>
                                                <p>
                                                    Order date:{" "}
                                                    <span>{moment(p.createdAt).fromNow()}</span>
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </div>
        );
    };


    return (
        <Layout title={`G'Day &`}
                description={`Welcome ${name}`} className='container-fluid'>
           <div className="row">
               <div className="col-md-3 m-b-250 mb-5">
                   {userLinks()}
               </div>
               <div className="col-md-7 m-b-250 mb-5">
                   {userInfo()}
                   {orderHistory(history)}
               </div>
               <div className="col-md-2 m-b-250 mb-5">

               </div>
           </div>
        </Layout>
    )
}

export default UserHome;
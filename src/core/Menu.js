import React, { Fragment } from 'react';
import { Link, withRouter } from "react-router-dom";
import { logout, isAuthenticated } from "../auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import {cartItemTotal} from "./CartHelpers";

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return {color: "#ff793f"}
    } else {
        return {color: "#3d3d3d"}
    }
}

const Menu = ({history}) => (
    <div className="reactStyles">
        <nav className="navbar navbar-expand-sm bg-info navbar-dark">
            <div className="container-fluid">
                <Link to="/" target="_parent"  className="nav-link">
                    <img src='../images/icons/logo.png' alt="LaxStore" />
                </Link>
                <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#reactnav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="reactnav">
                    <ul className="nav navbar-nav">
                        <li className="nav-item leftLinks"> <Link to="/" target="_parent" className="nav-link" style={isActive(history,                                 "/")}>Home</Link></li>
                        <li className="nav-item leftLinks"> <Link to="/shop"  className="nav-link" style={isActive(history, "/shop")                                    }>Shop</Link></li>
                    </ul>
                    <ul className="navbar-nav ml-auto dropdownDiv">
                        <li className="nav-item dropdown">
                            <Link
                                to="/login"
                                className="nav-link dropdown-toggle"
                                style={{color: '#3d3d3d'}}
                                data-toggle="dropdown">
                                <img src="../images/icons/icon-header-01.png" className="header-icon1" alt="ICON" />
                            </Link>
                            <ul className="dropdown-menu">
                                {!isAuthenticated() && (
                                    <Fragment>
                                        <li className="nav-item">
                                            <Link to="/login"  className="nav-link" style={isActive(history, "/login")}>
                                                <i className="fas fa-sign-in-alt"></i>   Login
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/register"  className="nav-link" style={isActive(history, "/register")}>
                                                <i className='fa fa-user-plus'></i>   Register
                                            </Link>
                                        </li>
                                    </Fragment>
                                )}
                                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                                    <Fragment>
                                        <li className="nav-item">
                                            <Link to="/user"
                                                  className="nav-link"
                                                  style={isActive(history, "/user")}>
                                                <i className='fa fa-user-secret header-icon1 js-show-header-dropdown'></i>   My Account
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <span onClick={() => logout(() => {
                                                history.push('/login');
                                            })}  className="nav-link" style={{cursor: 'pointer', color: '#3d3d3d'}}>
                                                <i className="fas fa-sign-out-alt"></i>  Logout
                                            </span>
                                        </li>
                                    </Fragment>
                                )}
                                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                                    <Fragment>
                                        <li className="nav-item">
                                            <Link to="/admin"
                                                  className="nav-link"
                                                  style={isActive(history, "/admin")}>
                                                <i className='fa fa-user-secret header-icon1 js-show-header-dropdown'></i>   Admin Account
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <span onClick={() => logout(() => {
                                                history.push('/login');
                                            })}  className="nav-link" style={{cursor: 'pointer', color: '#3d3d3d'}}>
                                                <i className="fas fa-sign-out-alt"></i>  Logout
                                            </span>
                                        </li>
                                    </Fragment>
                                )}
                            </ul>
                        </li>
                    </ul>
                    &nbsp;&nbsp;&nbsp;
                    <ul className="navbar-nav media-right dropdownDiv">
                        <li className="nav-item dropdown">
                                <Link
                                    to="/cart"
                                    className="nav-link dropdown-toggle"
                                    style={{color: '#3d3d3d'}}
                                    data-toggle="dropdown">
                                    <img src="../images/icons/icon-header-02.png"
                                         className="header-icon1 js-show-header-dropdown" alt="ICON" />
                                    <span className="header-icons-noti">{cartItemTotal()}</span>
                                </Link>
                            {/*{isAuthenticated() && isAuthenticated().user.role === 1 && (*/}
                            {/*    <Link*/}
                            {/*        to="/login"*/}
                            {/*        className="nav-link dropdown-toggle"*/}
                            {/*        style={{color: '#3d3d3d'}}*/}
                            {/*        data-toggle="dropdown">*/}
                            {/*        <img src="../images/icons/adminIcon.png"*/}
                            {/*             className="header-icon1 js-show-header-dropdown" alt="ICON" />*/}
                            {/*        <span className="header-icons-noti"></span>*/}
                            {/*    </Link>*/}
                            {/*)}*/}
                            <ul className="dropdown-menu">
                                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                                    <Fragment>
                                        <li className="nav-item">
                                            <Link to="/cart"  className="nav-link" style={isActive(history, "/cart")}>
                                                <i className='fa fa-shopping-cart'></i>   View Cart <sup><small className='cart-badge'>{cartItemTotal()}</small></sup>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/wishlist"  className="nav-link" style={isActive(history, "/wishlist")}>
                                                <i className="fas fa-heart"></i>   Wishlist
                                            </Link>
                                        </li>
                                    </Fragment>
                                )}
                                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                                    <Fragment>
                                        <li className="nav-item">
                                            <Link to="/createProduct"  className="nav-link" style={isActive(history, "/createProduct")}>
                                                <i className='fa fa-th-list'></i>   Add Product
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/createCategory"  className="nav-link" style={isActive(history, "/createCategory")}>
                                                <i className="fas fa-th-large"></i>   Add Category
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/orders"  className="nav-link" style={isActive(history, "/orders")}>
                                                <i className="fas fa-th-large"></i>   View Orders
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/users"  className="nav-link" style={isActive(history, "/users")}>
                                                <i className='fas fa-user-plus'></i>   Users
                                            </Link>
                                        </li>
                                    </Fragment>
                                )}
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
);

export default withRouter(Menu);

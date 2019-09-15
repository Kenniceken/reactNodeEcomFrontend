import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Register from "./user/Register";
import Login from "./user/Login";
import Home from "./core/Home";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import UserHome from "./user/UserHome";
import AdminHome from "./user/AdminHome";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";
import Orders from "./admin/Orders";
import Profile from "./user/Profile";
import EditProducts from "./admin/EditProducts";
import UpdateProduct from "./admin/UpdateProduct";
import About from "./core/About";
import Contact from "./core/Contact";
import EditCategory from "./admin/EditCategory";
import UpdateCategory from "./admin/UpdateCategory";


const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/shop" exact component={Shop}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/about" exact component={About}/>
                <Route path="/contact" exact component={Contact}/>
                <Route path="/register" exact component={Register}/>
                <PrivateRoute path='/user' exact component={ UserHome } />
                <AdminRoute path='/admin' exact component={ AdminHome } />
                <AdminRoute path='/createCategory' exact component={ AddCategory } />
                <AdminRoute path='/createProduct' exact component={ AddProduct } />
                <Route path="/product/:productId" exact component={Product} />
                <Route path="/cart" exact component={Cart} />
                <AdminRoute path='/orders' exact component={ Orders } />
                <AdminRoute path='/admin/products' exact component={ EditProducts } />
                <AdminRoute path='/admin/categories' exact component={ EditCategory } />
                <PrivateRoute path='/profile/:userId' exact component={ Profile } />
                <AdminRoute path='/admin/product/update/:productId' exact component={ UpdateProduct } />
                <AdminRoute path='/admin/category/update/:categoryId' exact component={ UpdateCategory } />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;

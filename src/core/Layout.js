import React from 'react';
import Menu from "./Menu";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.scss';

const Layout = ({title = "LaxStore", description = "Description", className, children}) => (
   <div>
       <Menu/>
       <div className="jumbotron layoutTexts">
           <h1 className="headerHead text-capitalize">{title}</h1>
           <p className="lead">{description}</p>
       </div>
       <div className={className}>{children}</div>
   </div>
);


export default Layout;
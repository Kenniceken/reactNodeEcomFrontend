import React from 'react';
// import { Link } from "react-router-dom";
// import { getProducts, getBraintreeClientToken } from "./apiCore";
// import Menu from "./Menu";
// import Card from "./Card";
// import {isAuthenticated} from "../auth";
// import DropIn from 'braintree-web-drop-in-react';


const Checkout = ({products}) => {

    // const [data, setData] = useState({
    //     success: false,
    //     clientToken: null,
    //     error: '',
    //     instance: {},
    //     address: ''
    // });

    // const userId = isAuthenticated() && isAuthenticated().user._id;
    // const token = isAuthenticated() && isAuthenticated().token;
    //
    //
    // const getToken = (userId, token) => {
    //     getBraintreeClientToken(userId, token).then(data => {
    //         if (data.error) {
    //             setData({...data, error: data.error});
    //         } else {
    //             setData({...data, clientToken: data.clientToken});
    //         }
    //     });
    // };

    // useEffect(() => {
    //     getToken(userId, token)
    // }, [])

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    // const showDropIn = () => (
    //     <div>
    //         {data.clientToken !== null && products.length > 0 ? (
    //             <div>
    //                 <DropIn options={{
    //                     authorization: data.clientToken
    //                 }} onInstance={instance => (data.instance = instance)} />
    //                 <button className='btn btn-outline-success rounded-0'> Checkout</button>
    //             </div>
    //         ) : null}
    //     </div>
    // );



    return <div>
        <h2>Total: ${getTotal()}</h2>
    </div>
}


export  default Checkout;
import { renderOrderSummary } from './checkout/orderSummary.js'
import renderPaymentSummary from './checkout/paymentSummary.js'
import {renderCheckoutHeader} from './checkout/checkoutheader.js'
import '../data/backend-practice.js'
import {loadProducts} from '../data/products.js'
 // import '../data/cart-oop.js';

import { loadCart } from '../data/cart.js'
// import '../data/cart-class.js';



Promise.all([
    new Promise((resolve)=>{
        console.log("fdfd");
        loadProducts(()=>{
            resolve('value1');
        })
    }),
    new Promise((resolve)=>{
        console.log("fdfd111");
        loadCart(()=>{
            resolve('value2');
        })
    })
]).then((values)=>{
    console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();

});

// new Promise((resolve)=>{
//     loadProducts(()=>{
//         resolve('value1');
//     })
// }).then((value)=>{
//     console.log(value);
//     return new Promise((resolve)=>{
//         loadCart(()=>{
//             resolve('value2');
//         })
//     })
// }).then((value)=>{
    // renderOrderSummary();
    // renderPaymentSummary();
    // renderCheckoutHeader();
   
// })


// loadProducts(()=>{
//     loadCart(()=>{
//         renderOrderSummary();
//         renderPaymentSummary();
//         renderCheckoutHeader();
//     })
// })

import { renderOrderSummary } from './checkout/orderSummary.js'
import renderPaymentSummary from './checkout/paymentSummary.js'
import {renderCheckoutHeader} from './checkout/checkoutheader.js'
import '../data/backend-practice.js'
import {loadProducts,loadProductsFetch} from '../data/products.js'
 // import '../data/cart-oop.js';

import { loadCart } from '../data/cart.js'
// import '../data/cart-class.js';

async function loadPage(){
    await loadProductsFetch();

    await new Promise((resolve)=>{
                loadCart(()=>{
                    resolve('value2');
                })});
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
}


loadPage();
// the values which are set in resolve will come into values in then
// Promise.all([
//     loadProductsFetch(),
//     new Promise((resolve)=>{
        
//         loadCart(()=>{
//             resolve('value2');
//         })
//     })
// ]).then((values)=>{
//     renderOrderSummary();
//     renderPaymentSummary();
//     renderCheckoutHeader();

// });

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

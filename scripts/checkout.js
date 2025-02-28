import { renderOrderSummary } from './checkout/orderSummary.js'
import renderPaymentSummary from './checkout/paymentSummary.js'
import {renderCheckoutHeader} from './checkout/checkoutheader.js'
import '../data/backend-practice.js'
import {loadProducts} from '../data/products.js'
 // import '../data/cart-oop.js';
// import '../data/cart-class.js';

new Promise((resolve)=>{
    console.log('start promise');
    loadProducts(()=>{
        console.log('loaded data');
        resolve();
        
        console.log('loaded data finished');
    })
}).then(()=>{
    console.log("passing the nextr");
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
})
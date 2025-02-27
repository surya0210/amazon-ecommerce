import { updateCartQuantity } from "../../data/cart.js";


export function renderCheckoutHeader(){
    const cartCount=updateCartQuantity();
    document.querySelector('.return-to-home-link').innerHTML=`${cartCount} items`
}
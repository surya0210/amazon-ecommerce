import {cart,removeFromCart,updateCartQuantity,cartQuantityEdit} from '../data/cart.js'
import {products} from '../data/products.js'
import {formatCurrency} from './utils/money.js'
 
let cartSummaryHTML="";
cart.forEach((cartItem)=>{
    const productId=cartItem.productId;
    let matchingProduct;
    products.forEach((product)=>{
        if (product.id===productId){
            matchingProduct=product;
        }
    });

    cartSummaryHTML+=`
    <div class="cart-item-container js-cart-container-${matchingProduct.id}">
    <div class="delivery-date">
        Delivery date: Wednesday, June 15
    </div>

    <div class="cart-item-details-grid">
        <img class="product-image"
        src=${matchingProduct.image}>

        <div class="cart-item-details">
        <div class="product-name">
           ${matchingProduct.name}
        </div>
        <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
            <span>
            Quantity: <span class="quantity-label quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary" data-product-id=${matchingProduct.id}>
            Update
            </span>
            <input class="quantity-input quantity-input-${matchingProduct.id}" value="${cartItem.quantity}" min=1 max=100 type="number">
            <span class="save-button link-primary" data-product-id=${matchingProduct.id}>Save</span>
            <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
            Delete
            </span>
        </div>
        </div>

        <div class="delivery-options">
        <div class="delivery-options-title">
            Choose a delivery option:
        </div>

        <div class="delivery-option">
            <input type="radio" class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                Tuesday, June 21
            </div>
            <div class="delivery-option-price">
                FREE Shipping
            </div>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                Wednesday, June 15
            </div>
            <div class="delivery-option-price">
                $4.99 - Shipping
            </div>
            </div>
        </div>
        <div class="delivery-option">
            <input type="radio" class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
            <div>
            <div class="delivery-option-date">
                Monday, June 13
            </div>
            <div class="delivery-option-price">
                $9.99 - Shipping
            </div>
            </div>
        </div>
        </div>
    </div>
    </div>
    `
})

let cartQuantity=updateCartQuantity();
document.querySelector('.return-to-home-link').innerHTML=`${cartQuantity} items`
document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML

document.querySelectorAll('.delete-quantity-link').forEach((link)=>{
    link.addEventListener('click',()=>{
        removeFromCart(link.dataset.productId);
        document.querySelector(`.js-cart-container-${link.dataset.productId}`).remove();
        cartQuantity=updateCartQuantity();
        document.querySelector('.return-to-home-link').innerHTML=`${cartQuantity} items`
    })
})

document.querySelectorAll('.update-quantity-link').forEach((link)=>{
    link.addEventListener('click',()=>{
        document.querySelector(`.js-cart-container-${link.dataset.productId}`).classList.add('is-editing-quantity');
    });
})

document.querySelectorAll('.save-button').forEach((link)=>{
    link.addEventListener('click',()=>{
        document.querySelector(`.js-cart-container-${link.dataset.productId}`).classList.remove('is-editing-quantity');
        const newQuantity=Number(document.querySelector(`.quantity-input-${link.dataset.productId}`).value)
        cartQuantityEdit(newQuantity,link.dataset.productId)
        let cartQuantity=updateCartQuantity();
        document.querySelector('.return-to-home-link').innerHTML=`${cartQuantity} items`
        document.querySelector(`.quantity-label-${link.dataset.productId}`).innerHTML=newQuantity
    })
})
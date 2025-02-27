import {cart,removeFromCart,updateCartQuantity,cartQuantityEdit,updateDeliveryOption} from '../../data/cart.js'
import {products,getProduct} from '../../data/products.js'
import formatCurrency from '.././utils/money.js'
import {renderPaymentSummary} from './paymentSummary.js'
import {deliveryOptions,getDeliveryOptions} from '../../data/deliveryOptions.js'
import {renderCheckoutHeader} from './checkoutheader.js'
import { deliveryDateFormatter } from '../utils/dateformater.js'




export function renderOrderSummary(){
     
    let cartSummaryHTML="";
    cart.forEach((cartItem)=>{
        const productId=cartItem.productId;
        const matchingProduct=getProduct(productId);
        const deliveryOptionId=cartItem.deliveryOptionID;
        const deliveryOption=getDeliveryOptions(deliveryOptionId);


        const deliveryDateStr=deliveryDateFormatter(deliveryOption.deliveryDays);

        cartSummaryHTML+=`
        <div class="cart-item-container js-cart-container-${matchingProduct.id}">
        <div class="delivery-date">
            Delivery date: ${deliveryDateStr}
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
                ${deliveryOptionsHTML(matchingProduct.id,cartItem)}
            
        </div>
        </div>
        </div>
        </div>
        `
    })

    function deliveryOptionsHTML(productId,cartItem){
        let deliverHtml=''
        deliveryOptions.forEach((deliveryOption)=>{
            const deliveryDateStr=deliveryDateFormatter(deliveryOption.deliveryDays)
            const priceStr= deliveryOption.priceCents
            ===0 
                ? 'FREE'
                :`$${formatCurrency(deliveryOption.priceCents)} - `;
            const isChecked=deliveryOption.id===cartItem.deliveryOptionID
            
            deliverHtml+=`<div class="delivery-option js-delivery-option" 
                        data-product-id="${cartItem.productId}"
                        data-delivery-option-id="${deliveryOption.id}">
            <input 
                ${isChecked ? 'checked' : ''}
                type="radio" class="delivery-option-input"
                name="delivery-option-${productId}" >
            <div>
            <div class="delivery-option-date">
                ${deliveryDateStr}
            </div>
            <div class="delivery-option-price">
                ${priceStr} Shipping
            </div>
            </div>
        </div>`
        })

        return deliverHtml;

    }    
    
    document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML

    document.querySelectorAll('.delete-quantity-link').forEach((link)=>{
        link.addEventListener('click',()=>{
            removeFromCart(link.dataset.productId);
            // document.querySelector(`.js-cart-container-${link.dataset.productId}`).remove();
            renderOrderSummary();
            renderPaymentSummary();
            renderCheckoutHeader();
            
            
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
            // updateCartQuantity();
            // document.querySelector('.return-to-home-link').innerHTML=`${cartQuantity} items`
            // document.querySelector(`.quantity-label-${link.dataset.productId}`).innerHTML=newQuantity
            renderPaymentSummary();
            renderOrderSummary();
            renderCheckoutHeader();
        })
    })


    document.querySelectorAll('.js-delivery-option').forEach((element)=>{
        element.addEventListener('click',()=>{
            const {productId,deliveryOptionId}=element.dataset;
            updateDeliveryOption(productId,deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
            renderCheckoutHeader();
        })
    })
}
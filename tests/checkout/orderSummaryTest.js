import { cart, loadFromStorage } from '../../data/cart.js';
import { loadProducts } from '../../data/products.js';
import {renderOrderSummary} from '../../scripts/checkout/orderSummary.js'

// 1.how the page looks
//2.how the page behaves

describe('test suite :render order summary',()=>{
    beforeEach(()=>{
        console.log("Starting the test");
    });
    afterEach(()=>{
        console.log("Ending the test");
    })
    // done makes the test wait till loadProdcuts
    beforeAll((done)=>{
        loadProducts(()=>{
            done();
        });
    })
    afterAll(()=>{
        console.log("End case execution completed");
    })
    it('displays the cart',()=>{
        document.querySelector('.js-test-container').innerHTML=`
        <div class="js-order-summary"></div>`
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([
                {productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity:1,
            deliveryOptionId:1},
            {productId:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity:1,
            deliveryOptionId:1}
            ]);
        });
        loadFromStorage();
        renderOrderSummary();
        expect(document.querySelectorAll('.cart-item-container').length).toEqual(2);

        document.querySelector('.js-test-container').innerHTML=''
        // .toContain(some text in the body)
        });

   
    it ('removes a product',()=>{
        spyOn(localStorage,'setItem');
        document.querySelector('.js-test-container').innerHTML=`
        <div class="js-order-summary"></div>
        <div class="payment-summary"></div>
        <div class="return-to-home-link"></div>`
        const productId1='e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        const productId2="15b6fc6f-327a-4ec4-896f-486349e85a3d";
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([
                {productId:productId1,
                quantity:1,
            deliveryOptionId:1},
            {productId:productId2,
                quantity:1,
            deliveryOptionId:1}
            ]);
        });
        loadFromStorage();
        renderOrderSummary();
        document.querySelector('.js-delete-link-e43638ce-6aa0-4b85-b27f-e1d07eb678c6').click(); 
        document.querySelector('.js-test-container').innerHTML=''

        // expect(localStorage.setItem).toHaveBeenCalledWith('cart','[]')
        // toHaveBeenCalledWith()
    });
});


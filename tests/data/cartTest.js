import {cart,addToCart,loadFromStorage} from '../../data/cart.js';

describe('test suite:addToCart',()=>{
    it('adds an existing product to the cart',()=>{
        spyOn(localStorage,'setItem');
        
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([
                {productId:'54e0eccd-8f36-462b-b68a-8182611d9add',
                quantity:1,
            deliveryOptionId:1}
            ]);
        });
        expect(cart.length).toEqual(1);
        addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');
        expect(cart[0].quantity).toEqual(1);

    });

    it('adds a new product to the cart',()=>{

        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        loadFromStorage();
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
    });
})

// .not.toEqual
// toContain

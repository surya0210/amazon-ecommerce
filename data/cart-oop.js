
function Cart(localStroageKey){
    const cart={
        cartItems:undefined,
    
        loadFromStorage(){
            this.cartItems=JSON.parse(localStorage.getItem(localStroageKey)) ||[];
            
            if (!this.cartItemst){
                this.cartItems=[];
            }
        },
    
        saveToStorage(){
            localStorage.setItem(localStroageKey,JSON.stringify(this.cartItems));
        },
    
        addToCart(productId){
            const el=document.querySelector(`.js-quantiy-selector-${productId}`)
            const quantity= el?Number(el.value):1;
            let matchingItem;
            this.cartItems.forEach(item=>{
                if (productId==item.productId){
                    matchingItem=item;
                }
            })
            if (matchingItem){
                matchingItem.quantity+=quantity
            }else{
                this.cartItems.push({
                    productId,
                    quantity,
                    deliveryOptionID: '1' 
                })}
            this.saveToStorage();
        },
    
        removeFromCart(productId){
            const newcart=[];
    
            this.cartItems.forEach((item)=>{
                if (item.productId!==productId){
                newcart.push(item);}
            });
            this.cartItems=newcart;
            this.saveToStorage();
        },
    
        updateDeliveryOption(productId,deliveryOptionID){
            let matchingItem;
        
        
            this.cartItems.forEach((cartItem)=>{
                if (productId===cartItem.productId){
                    matchingItem=cartItem;
                }
            });
        
            matchingItem.deliveryOptionID=deliveryOptionID;
        
            this.saveToStorage();
        },
    
        updateCartQuantity(){
            let cartQuantity=0;
        
            this.cartItems.forEach((item)=>{
                cartQuantity+=item.quantity;
            })
            return cartQuantity;
        },
    
        cartQuantityEdit(quantity,id){
            this.cartItems.forEach(item=>{
                if (item.productId===id){
                    item.quantity=quantity;
                }
            }) 
            this.saveToStorage();
        }
    };

    return cart;
}


const cart=Cart('cart-oop');

cart.loadFromStorage();

const businessCart=Cart('cart-business');
businessCart.loadFromStorage();
// console.log(cart,businessCart);

class Cart{

    cartItems;
    localStorageKey;

    constructor(localStorageKey){
        this.localStoragekey=localStorageKey
        this.loadFromStorage();
    }

    loadFromStorage(){
        this.cartItems=JSON.parse(localStorage.getItem(this.localStorageKey)) ||[];
        
        if (!this.cartItemst){
            this.cartItems=[];
        }
    }

    saveToStorage(){
        localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItems));
    }
    
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
    }

    removeFromCart(productId){
        const newcart=[];

        this.cartItems.forEach((item)=>{
            if (item.productId!==productId){
            newcart.push(item);}
        });
        this.cartItems=newcart;
        this.saveToStorage();
    }

    updateDeliveryOption(productId,deliveryOptionID){
        let matchingItem;
    
    
        this.cartItems.forEach((cartItem)=>{
            if (productId===cartItem.productId){
                matchingItem=cartItem;
            }
        });
    
        matchingItem.deliveryOptionID=deliveryOptionID;
    
        this.saveToStorage();
    }

    updateCartQuantity(){
        let cartQuantity=0;
    
        this.cartItems.forEach((item)=>{
            cartQuantity+=item.quantity;
        })
        return cartQuantity;
    }

    cartQuantityEdit(quantity,id){
        this.cartItems.forEach(item=>{
            if (item.productId===id){
                item.quantity=quantity;
            }
        }) 
        this.saveToStorage();
    }

}


const cart=new Cart('cart-oop');
const businessCart=new Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();
// console.log(cart,businessCart);


// console.log(businessCart instanceof Cart);
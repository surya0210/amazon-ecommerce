export let cart=JSON.parse(localStorage.getItem('cart'));


if (!cart){
    cart=[];
}

function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
}


export function addToCart(productId){
    const quantity=Number(document.querySelector(`.js-quantiy-selector-${productId}`).value)
    let matchingItem;
    cart.forEach(item=>{
        if (productId==item.productId){
            matchingItem=item;
        }
    })
    if (matchingItem){
        matchingItem.quantity+=quantity
    }else{
        cart.push({
            productId,
            quantity,
            deliveryOptionID: '1' 
        })}
    saveToStorage();
}


export function removeFromCart(productId){
    const newcart=[];

    cart.forEach((item)=>{
        if (item.productId!==productId){
        newcart.push(item);}
    });
    cart=newcart;
    saveToStorage();
}



export function updateCartQuantity(){
    let cartQuantity=0;

    cart.forEach((item)=>{
        cartQuantity+=item.quantity;
    })
    return cartQuantity;
}


export function cartQuantityEdit(quantity,id){
    cart.forEach(item=>{
        if (item.productId===id){
            item.quantity=quantity
}
}) 
saveToStorage();
}

export function updateDeliveryOption(productId,deliveryOptionID){
    let matchingItem;


    cart.forEach((cartItem)=>{
        if (productId===cartItem.productId){
            matchingItem=cartItem;
        }
    });

    matchingItem.deliveryOptionID=deliveryOptionID;

    saveToStorage();
}
export const cart=[];


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
            quantity
        })}
    
}


import {formatCurrency} from '../scripts/utils/money.js';
class Product{
  id;
  name;
  image;
  rating;
  priceCents;

  constructor(productDetails){
    this.id=productDetails.id;
    this.name=productDetails.name;
    this.image=productDetails.image;
    this.rating=productDetails.rating;
    this.priceCents=productDetails.priceCents;
  }

  getStarsUrl(){
    return `images/ratings/rating-${this.rating.stars*10}.png`
  }

  getPrice(){
    return `$${formatCurrency(this.priceCents)}`;

  }

  extraInfoHTML(){
    return '';
  }

}

class Clothing extends Product{

  sizeChartLink;

  constructor(productDetails){
    super(productDetails); //calls the constructor of the parent class
    this.sizeChartLink=productDetails.sizeChartLink;
  }

  extraInfoHTML(){
    return `
    <a href="${this.sizeChartLink}" target="_blank">
      Size chart
    </a>
    `;
  }

};


export function getProduct(productId){
  let matchingProduct;
  products.forEach((product)=>{
      if (product.id===productId){
          matchingProduct=product;
      }
  });
  
  return matchingProduct;
}


export let products=[];


export function loadProducts(afterLoadingFunc){
  const xhr=new XMLHttpRequest();
  xhr.addEventListener('load',()=>{
    products=JSON.parse(xhr.response).map((productDetails)=>{
        if (productDetails.type==='clothing'){
          return new Clothing(productDetails);
        }
        return new Product(productDetails);
      });

    
    afterLoadingFunc();
  })
  xhr.open('GET','https://supersimplebackend.dev/products');
  xhr.send();

} 





// same process of XMLHttpRequest vs fetch


export function loadProductsFetch(){
  const promise=fetch(
    'https://supersimplebackend.dev/products'
    ).then((response)=>{
    // fetch uses primise we cna use then and wait till it loads and then response.json
    // is again asynchronous and we  retuen a promise so we use another then  
      return response.json();
    }).then ((productsData)=>{
          products=productsData.map((productDetails)=>{
          if (productDetails.type==='clothing'){
            return new Clothing(productDetails);
          }
        return new Product(productDetails);
      });
      // ;
  })
  return promise; 
}

// loadProductsFetch().then(()=>{
//   // afterLoadingFunc();
//   console.log("fdfdfd");
// });





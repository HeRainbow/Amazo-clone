export let cart = JSON.parse(localStorage.getItem('cart')) ||
[
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }
];

function saveToStorage() {
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId){
  let matchingItem;//记录是否当前物品已经在购物车里存在

  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if(matchingItem){//如果购物车中已经有当前的物品，则计数加一
    matchingItem.quantity +=1;
  }
  else {//如果购物车中没有当前的物品，则在数组中加入产品名称即数量
    cart.push({
    productId: productId,
    quantity: 1
  });
}
  saveToStorage();
}
// 1.创建一个新的数组
// 2.遍历旧数组
// 3.将除了productId之外的所有值都存入新数组
export function removeFromCart(productId){
  cart =  cart.filter((cartItem)=>{
    if(cartItem.productId===productId){
      return false
    }else{
      return true
    }
  });
  
  saveToStorage();
}

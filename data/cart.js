export const cart = [
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }
];

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
}

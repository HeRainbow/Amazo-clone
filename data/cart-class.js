class Cart{//类方法创建对象
  cartItems;
  localStorageKey;


  constructor(localStorageKey){//构造函数
    this.localStorageKey = localStorageKey;
    
    this.loadFromStorage();

  }


  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) ||
  [
    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }
  ];
  }

  saveToStorage () {
    localStorage.setItem(this.localStorageKey,JSON.stringify(this.cartItems));
  }


  
  addToCart(productId){
    let matchingItem;//记录是否当前物品已经在购物车里存在
  
    this.cartItems.forEach((cartItem)=>{
      if(productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
  
    if(matchingItem){//如果购物车中已经有当前的物品，则计数加一
      matchingItem.quantity +=1;
    }
    else {//如果购物车中没有当前的物品，则在数组中加入产品名称即数量
      this.cartItems.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }
    this.saveToStorage();
  }


  
  // 1.创建一个新的数组
  // 2.遍历旧数组
  // 3.将除了productId之外的所有值都存入新数组
  removeFromCart(productId){
    this.cartItems =  this.cartItems.filter((cartItem)=>{
      if(cartItem.productId === productId){
        return false
      }else{
        return true
      }
    });
    
    this.saveToStorage();
  }

    
  
  updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;//记录是否当前物品已经在购物车里存在
  
    this.cartItems.forEach((cartItem)=>{
      if(productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0;//计算当前购物车中物品总数
    this.cartItems.forEach((cartItem)=>{
      cartQuantity += cartItem.quantity;
    });
    return cartQuantity;
  }

  updateQuantity(productId, newQuantity){
    this.cartItems.forEach((cartItem)=>{
      if(cartItem.productId === productId){
        cartItem.quantity = newQuantity;
      };
    });
  
    this.saveToStorage();
  }

}




const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');




console.log(cart);
console.log(businessCart);




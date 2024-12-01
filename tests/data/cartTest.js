import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('test suite: addToCart', ()=>{
  it('adds an existing product to the cart',()=>{
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);//localStorage返回的是字符串
    });//第一个参数是我们想要模拟的对象，第二个参数是想要标记的方法
    loadFromStorage();
    
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);//有可能报错，也有可能不报错，这种测试称为不稳定的测试
    //可以使用MOCK模拟解决
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].quantity).toEqual(2);

  });

  it('adds a new product to the cart',()=>{
    spyOn(localStorage,'setItem');

    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]);//localStorage返回的是字符串
    });//第一个参数是我们想要模拟的对象，第二个参数是想要标记的方法
    loadFromStorage();
    
    console.log(localStorage.getItem(cart));

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);//有可能报错，也有可能不报错，这种测试称为不稳定的测试
    //可以使用MOCK模拟解决
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].quantity).toEqual(1);
  })

})
import { renderOrderSummary } from "../../scripts/checkout/orderSummery.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProducts } from "../../data/products.js";



describe('test suite: renderOrderSummery',() => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeAll((done)=>{
    loadProducts(()=>{
      done();//只有等done()执行之后才继续执行后续代码
    });
  });
  beforeEach(() => {//先执行这段代码再执行其他it
    spyOn(localStorage,'setItem');
    document.querySelector('.js-test-container').innerHTML = `
    <div class="js-order-summery"></div>
    <div class="js-payment-summary"></div>
    <div class="js-check-out-items"></div>
    `;
   
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([  {
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);//localStorage返回的是字符串
    });//第一个参数是我们想要模拟的对象，第二个参数是想要标记的方法
    loadFromStorage();


    renderOrderSummary();
  });



  it('dispaly the cart', () => {

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');//查找在一堆文字内部是否有匹配的文字
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');

    document.querySelector('.js-test-container').innerHTML = ``;
  });

  it('removes a product',() =>{

  document.querySelector(`.js-delete-link-${productId1}`).click();

  expect(document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);
  expect(
    document.querySelector(`.js-cart-item-container-${productId1}`)
  ).toEqual(null);
  expect(
    document.querySelector(`.js-cart-item-container-${productId2}`)
  ).not.toEqual(null);
  expect(cart.length).toEqual(1);
  expect(cart[0].productId).toEqual(productId2);

  document.querySelector('.js-test-container').innerHTML = ``;
  });
  
})


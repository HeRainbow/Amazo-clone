import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";//一个点表示当前文件夹

let cartSummeryHTML = '';

let cartQuantity = calculateCartQuantity();
document.querySelector('.js-check-out-items').innerHTML = `${cartQuantity} items`;

cart.forEach((cartItem)=>{
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product)=>{//扫描数据库以获取
    if(product.id === productId){//数据库中的为product.id,购物车中的为productId
      matchingProduct = product
    }
  });


    cartSummeryHTML+=` <div class="cart-item-container 
    js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-quantity-link"
            data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-quantity-link"
            data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link"
            data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;
});
document.querySelector('.js-order-summery').innerHTML = cartSummeryHTML;

// 实现从结算页面删除产品需要
// 1.从cart数组中删除对应的数据:cart.js中的removeFromCart();
// 2.删除对应的HTML代码
// 使用DOM后用.remove()方法删除对应HTML代码
document.querySelectorAll('.js-delete-link')
  .forEach((link)=>{
    link.addEventListener('click',()=>{
      const productId = link.dataset.productId;//使用data-*来标记需要的元素
      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`)//使用DOM通过productId选中对应的container
      container.remove();
      cartQuantity = calculateCartQuantity();
      document.querySelector('.js-check-out-items').innerHTML = `${cartQuantity} items`;
    })
  });

document.querySelectorAll('.js-update-quantity-link')
  .forEach((link)=>{
    link.addEventListener('click',()=>{
      const productId =link.dataset.productId;
      const container = document.querySelector(`
        .js-cart-item-container-${productId}`);
      container.classList.add('is-editing-quantity');
   });
})

document.querySelectorAll('.js-save-quantity-link')
  .forEach((link)=>{
    link.addEventListener('click',()=>{
      const productId = link.dataset.productId;
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      const inputValue = Number(quantityInput.value);
      if (inputValue < 0 || inputValue >= 1000) {
        alert('Quantity must be at least 0 and less than 1000');
        return;
      }
      updateQuantity(productId,inputValue);
      const container = document.querySelector(`
        .js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');
      cartQuantity = calculateCartQuantity();
      document.querySelector('.js-check-out-items').innerHTML = `${cartQuantity} items`;
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML = inputValue;
    });
})
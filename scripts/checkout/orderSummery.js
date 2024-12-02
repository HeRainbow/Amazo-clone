import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";//一个点表示当前文件夹
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
//不使用花括号,默认导出
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPamentSummery } from "./paymentSummery.js";

export function renderOrderSummary(){



  let cartSummeryHTML = '';

  let cartQuantity = calculateCartQuantity();
  document.querySelector('.js-check-out-items').innerHTML = `${cartQuantity} items`;

  cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    const deliveryOptionId = cartItem.deliveryOptionId;
    
    const matchingProduct = getProduct(productId);


    const deliveryOption = getDeliveryOption(deliveryOptionId);

    

    const today = dayjs();
    const deliveryDay = today.add(
      deliveryOption.deliveryDays,
      'days'
    )
    const dateString = deliveryDay.format(
      'dddd, MMMM D'
    );

    cartSummeryHTML+=` <div class="cart-item-container 
      js-cart-item-container 
      js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
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
              <span class="delete-quantity-link link-primary js-delete-link
              js-delete-link-${matchingProduct.id}"
              data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct,cartItem)}
            
          </div>
        </div>
      </div>`;
  });

  function deliveryOptionsHTML(matchingProduct,cartItem){
    let html = '';
    deliveryOptions.forEach((deliveryOption)=>{
      const today = dayjs();
      const deliveryDay = today.add(
        deliveryOption.deliveryDays,
        'days'
      )
      const dateString = deliveryDay.format(
        'dddd, MMMM D'
      );
      const priceString = deliveryOption.priceCents === 0 
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      html +=
      `
        <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" 
          ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `
    });
    return html;
  }



  document.querySelector('.js-order-summery').innerHTML = cartSummeryHTML;

  // 实现从结算页面删除产品需要
  // 1.从cart数组中删除对应的数据:cart.js中的removeFromCart();
  // 2.删除对应的HTML代码
  // 使用DOM后用.remove()方法删除对应HTML代码
  document.querySelectorAll('.js-delete-link')
    .forEach((link)=>{
      link.addEventListener('click',()=>{
        const productId = link.dataset.productId;//使用data-*来标记需要的元素
        removeFromCart(productId);//更新购物车数据

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`)//使用DOM通过productId选中对应的container
        container.remove();
        cartQuantity = calculateCartQuantity();
        document.querySelector('.js-check-out-items').innerHTML = `${cartQuantity} items`;
        renderPamentSummery();
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
        renderPamentSummery();
      });
  })

  document.querySelectorAll('.js-delivery-option')
    .forEach((element)=>{
      element.addEventListener('click',()=>{
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPamentSummery();
      })
  })
}
//mvc 

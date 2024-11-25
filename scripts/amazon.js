
let productsHTML ='';

products.forEach((product)=>{
  productsHTML +=`
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
      <!-- 可以使用.toFix()显示小数，括号内输入小数后几位 -->
        $${(product.priceCents /100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart-button"
      data-product-id="${product.id}">
        Add to Cart
      </button>
      <!-- 可以使用dataAttribute标记特定元素的额外信息，使用时以 'data-*' 为开头
      例如上述代码中data-product-id，后续可使用dataset访问所有的data-* -->
    </div>
  `;
});

document.querySelector('.js-products-grid')
  .innerHTML = productsHTML;
document.querySelectorAll('.js-add-to-cart-button')//选定所有<button>生成一个对象的数组
  .forEach((button)=>{//每个<button>都创建一个监听器
    button.addEventListener('click',()=>{
      //可以使用dataAttribute标记特定元素的额外信息，使用时以 'data-*' 为开头
      //例如上述代码中data-product-id，后续可使用dataset访问所有的data-*
      const productId = button.dataset.productId;//注意将此处的破折号-换成大写字母N
      
      let matchingItem;//记录是否当前物品已经在购物车里存在

      cart.forEach((item)=>{
        if(productId === item.productId) {
          matchingItem = item;
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
    let cartQuantity = 0;//计算当前购物车中物品总数
    cart.forEach((item)=>{
      cartQuantity += item.quantity;
    });
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    })
  })

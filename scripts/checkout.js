import { renderOrderSummary } from "./checkout/orderSummery.js";
import { renderPamentSummery } from "./checkout/paymentSummery.js";
// import '../data/cart-class.js';
// import '../data/backend-pratice.js'
import { loadProducts } from "../data/products.js";

Promise.all([

]).then(()=>{
  
});


//Promise是一个内置类，在创建时会立即执行
new Promise((resolve)=>{//resolve是一个函数，与done（）类似
  loadProducts(()=>{
    resolve();
  });
}).then(()=>{//创建了一个新的线程


  renderOrderSummary();
  renderPamentSummery();
})

/*
loadProducts(()=>{
  renderOrderSummary();
  //使用DOM来改变页面HTML需要刷新才能看见改变，生成HTML则即时修改
  //此技术称为MVC  
  // module 存储数据
  // view 获取数据并将其显示在页面上的HTML代码
  // Controller 与页面互动时会运行代码
  
  renderPamentSummery();
});
*/
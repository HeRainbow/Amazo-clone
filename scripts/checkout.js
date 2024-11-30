import { renderOrderSummary } from "./checkout/orderSummery.js";

renderOrderSummary();
//使用DOM来改变页面HTML需要刷新才能看见改变，生成HTML则即时修改
//此技术称为MVC  
// module 存储数据
// view 获取数据并将其显示在页面上的HTML代码
// Controller 与页面互动时会运行代码
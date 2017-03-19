require("./index.scss");
require("../common/common.js");
const api = require('./../api/index')
console.log("client/page1/index.js");
console.log(3333)
//Uncomment these to enable hot module reload for this entry.
if (module.hot) {
  module.hot.accept();
}

console.log(5555)

// (async function mm() {
//     const {success, data} = 
//     //if (success) this.list = data
// })()
 api.get('topics', {page: 1}).then((data) => {
 	console.log(data)
 })
// var asyncReadFile = async function (){
//   var f1 = await
//   console.log(f1);
// };


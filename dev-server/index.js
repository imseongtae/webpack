import './src/script1';
import './src/script2';

var div = document.querySelector('.container');
div.innerText += '\n Webpack loaded!!';
// div.style.color = 'red';

console.log("webpack loaded!")
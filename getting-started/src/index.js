import _ from 'lodash';
// var _ = require('lodash');

function component() {
  var element = document.createElement('div');

  /* lodash is required for the next line to work */
  element.innerHTML = _.join(['Hello','webpack', 'Only'], ' ');
  // element.innerHTML = "Hello webpack Only"; //와 같다


  return element;
}

document.body.appendChild(component());
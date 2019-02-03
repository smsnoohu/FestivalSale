var express = require('../node_modules/express');

var app = express();
app.use('/', express.static(__dirname + '/www'));



/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
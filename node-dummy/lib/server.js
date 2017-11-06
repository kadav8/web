'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _endpoints = require('./endpoints');

var _endpoints2 = _interopRequireDefault(_endpoints);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var port = 3000;

app.use((0, _cors2.default)());
app.use(_express2.default.static('public'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));

app.listen(port, console.log('Example app listening on port ' + port));

app.get('/', function (req, res) {
    return res.send('Dummy backend service');
});

app.use('/api', _endpoints2.default);
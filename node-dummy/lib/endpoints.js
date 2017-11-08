'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
module.exports = router;

router.get('/products', function (req, res) {
    var products = {
        items: []
    };
    var i;
    for (i = 0; i < rand(10, 20); i++) {
        products.items[i] = generateProduct(i);
    }
    res.json(products);
});

function generateProduct(id) {
    var product = {
        id: id,
        name: 'Super Mario ' + id,
        manufacturer: 'Nintendo',
        price: rand(10000, 30000),
        status: ['active', 'inactive'][rand(0, 1)],
        addDate: rand(2014, 2017) + '/' + rand(10, 12) + '/' + rand(10, 28)
    };
    return product;
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
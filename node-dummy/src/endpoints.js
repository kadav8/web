import express from 'express';

let router = express.Router();
module.exports = router;

router.get('/products', function(req, res) {
    //sleepFor(200);
    var products = {
        items: []       
    };
    var i;
    for(i = 1; i<=200; i++) {
        products.items[i] = generateProduct(i);
    }
    res.json(products);
});

router.get('/orders/:status', function(req, res) {
    var orders = {
        items: []       
    };
    var i;
    let s = req.params.status;
    for(i = 1; i<=rand(50,200); i++) {
        orders.items[i] = generateOrders(i,s);
    }
    res.json(orders);
});

function generateProduct(id) {
    var product = {
        id: id,
        name: 'Super Mario ' + id,
        manufacturer: 'Nintendo',
        price: rand(10000,30000),
        status: ['Active', 'Active', 'Active', 'Active', 'Active', 'Inactive'][rand(0,5)],
        addDate: rand(2014, 2017) + '/' + rand(10, 12) + '/' + rand(10,28),
        stock: rand(100,200),
    };
    return product; 
}

function generateOrders(id, status) {
    var order;
    if(status == null || status === 'all') {
        order = {
            id: id,
            customerName:  ['Harry Potter', 'Gregory House', 'Hermione Granger', 'Tyrion Lannister', 'Fiona Gallagher'][rand(0,4)],
            status: ['Claim', 'Completed', 'Returned', 'Archived'][rand(0,3)],
            total: rand(100000,3000000),
            orderDate: rand(2014, 2017) + '/' + rand(10, 12) + '/' + rand(10,28),
            payment: ['Bank', 'Check', 'Cash'][rand(0,2)],
            delivery: ['Budapest', 'Szeged', 'Győr'][rand(0,2)],
        };
    } else {
        order = {
            id: id,
            customerName:  ['Harry Potter', 'Gregory House', 'Hermione Granger', 'Tyrion Lannister', 'Fiona Gallagher'][rand(0,4)],
            status: status,
            total: rand(100000,3000000),
            orderDate: rand(2014, 2017) + '/' + rand(10, 12) + '/' + rand(10,28),
            payment: ['Bank', 'Check', 'Cash'][rand(0,2)],
            delivery: ['Budapest', 'Szeged', 'Győr'][rand(0,2)],
        };
    }
    return order; 
}

function rand(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){} 
}
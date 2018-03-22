'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
module.exports = router;

router.get('/projects', function (req, res) {
    //sleepFor(200);
    var projects = {
        items: []
    };
    var i;
    for (i = 1; i <= 20; i++) {
        projects.items[i] = generateProjects(i);
    }
    res.json(projects);
});

router.get('/issues', function (req, res) {
    //sleepFor(200);
    var is = {
        items: []
    };
    var i;
    for (i = 1; i <= 200; i++) {
        is.items[i] = generateIssues(i);
    }
    res.json(is);
});

function generateProjects(id) {
    var project = {
        id: id,
        name: 'Project ' + id,
        type: 'Business',
        lead: ['Albus Dumbledore', 'Yoda'][rand(0, 1)],
        status: ['Active', 'Active', 'Active', 'Active', 'Active', 'Inactive'][rand(0, 5)],
        addDate: rand(2014, 2017) + '/' + rand(10, 12) + '/' + rand(10, 28),
        client: ['Apple', 'Disney'][rand(0, 1)]
    };
    return project;
}

function generateIssues(id) {
    var is = {
        id: id,
        name: 'Issue ' + id,
        summary: ['Upgrade spring boot version', 'Clean the code', 'Richtext editor for issue description', 'Remove Id field', 'Entity does not load', 'Null Pointer Exception'][rand(0, 5)],
        priority: ['High', 'Medium', 'Low'][rand(0, 2)],
        type: ['Bug', 'New Feature'][rand(0, 1)],
        status: ['Todo', 'In Progress', 'Under Review', 'Done', 'Cancelled'][rand(0, 4)],
        addDate: rand(2014, 2017) + '/' + rand(10, 12) + '/' + rand(10, 28),
        project: ['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5', 'Project 6'][rand(0, 5)]
    };
    return is;
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleepFor(sleepDuration) {
    var now = new Date().getTime();
    while (new Date().getTime() < now + sleepDuration) {}
}
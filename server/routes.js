// Load modules
"use strict";

var Mission = require('./controller/mission'),
  Static = require('./static');

// API Server Endpoints
exports.endpoints = [

  { method: 'GET',  path: '/{somethingss*}', config: Static.get },
  { method: 'GET',  path: '/checkStatus', config: Mission.checkStatus },
  { method: 'POST',  path: '/setMission', config: Mission.setMission },  
  { method: 'GET', path: '/mission', config: Mission.getMission},
  { method: 'GET', path: '/mission/level', config: Mission.getMissionByLevel},  
  { method: 'POST', path: '/mission', config: Mission.create},
  { method: 'GET', path: '/mission/all', config: Mission.getAll},
  { method: 'PUT', path: '/mission/{name}', config: Mission.update},
  { method: 'DELETE', path: '/mission/{name}', config: Mission.remove}
];
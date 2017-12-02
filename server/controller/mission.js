'use strict';

var Joi = require('joi'),
  Boom = require('boom'),
  Mission = require('../model/mission');

  var sameMission = true;
  var mission;

function findMission(missionName) {
    console.log(missionName);  
    Mission.find({name: missionName}, function(err, foundMission){
      if(!err){
        return foundMission;
      }
      return err.name;
    });
  };


exports.checkStatus = {
  handler: function(request, reply){
    if(sameMission){
      return reply({status: sameMission, mission: mission});
    }
    var missionReturn = {status: sameMission, mission: mission};
    sameMission = true;    
    return reply(missionReturn);
  }
};

exports.setMission = {
  handler: function(request, reply){
    var missionName = request.payload.missionName;
    Mission.findByName(missionName, function (err, foundMission){
      if(!err) {
          mission = foundMission;
          sameMission = false;
          console.log('New Mission Found: ' + foundMission.name);
          return reply();
      }
      return reply(Boom.badImplementation(err));     
    });
  }
};

exports.getAll = {
  handler: function (request, reply) {
    Mission.find({}, function (err, mission) {
      if (!err) {
        return reply(mission);
      }
      return reply(Boom.badImplementation(err)); // 500 error
    });
  }
};

exports.getMission = {
  handler: function (request, reply) {
    //TODO: Add conditional logic for request dependant reply
    var missionName = request.payload.missionName;
    Mission.findByName(missionName, function (err, foundMission){
      if(!err) {
          return reply(foundMission);
      }
      return reply(Boom.badImplementation(err));     
    });
  }
};

exports.create = {
  validate: {
    payload: {
      name   : Joi.string().required(),
      tagline  : Joi.string().optional()
    }
  },
  handler: function (request, reply) {
    var mission = new Mission(request.payload);
    mission.save(function (err, user) {
      if (!err) {
        return reply(mission).created('/mission/' + user._id); // HTTP 201
      }
      if (11000 === err.code || 11001 === err.code) {
        return reply(Boom.forbidden("please provide another mission, this one already exist"));
      }
      return reply(Boom.forbidden(err)); // HTTP 403
    });
  }
};

exports.update = {
  validate: {
    payload: {
      name  : Joi.string().required()
    }
  },
  handler: function (request, reply) {
    Mission.findOne({ 'name': request.params.name }, function (err, mission) {
      if (!err) {
        mission.tagline = request.payload.tagline;
        mission.save(function (err, user) {
          if (!err) {
            return reply(mission); // HTTP 201
          }
          return reply(Boom.forbidden(err)); // HTTP 403
        });
      }
      else{ 
        return reply(Boom.badImplementation(err)); // 500 error
      }
    });
  }
};

exports.remove = {
  handler: function (request, reply) {
    Mission.findOne({ 'name': request.params.name }, function (err, mission) {
      if (!err && mission) {
        mission.remove();
        return reply({ message: "Mission deleted successfully"});
      }
      if (!err) {
        return reply(Boom.notFound());
      }
      return reply(Boom.badRequest("Could not delete mission :("));
    });
  }
};
'use strict';

var Joi = require('joi'),
  Boom = require('boom'),
  Mission = require('../model/mission');

  var sameMission = true;
  var mission;
  var previousMission;


exports.checkStatus = {
  handler: function(request, reply){
    if(sameMission){
      return reply({status: sameMission, mission: mission});
    }
    var missionReturn = {status: sameMission, mission: mission, previous: previousMission};
    sameMission = true;    
    return reply(missionReturn);
  }
};

exports.setMission = {
  handler: function(request, reply){
    //Using a query param for now, need to do more investigation into post data(form) in angular
    Mission.findByName(request.query.missionName, function (err, foundMission){
      if(!err) {
          previousMission = mission;
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
    Mission.find({}, function(err, data){
      if(!err){
        return reply(data);
      }
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

exports.getMissionByLevel = {
  handler: function (request, reply) {
    var missionLevel = request.url.query.missionLevel;
    if(missionLevel === 'All'){
      Mission.find({}, function(err, data){
        if(!err){
          return reply(data);
        }
      });
    } else {
      Mission.findByLevel(missionLevel, function (err, missions){
        if(!err) {
          return reply(missions);
        }
        return reply(Boom.badImplementation(err));     
      });
    }
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

exports.getPlaylist = {
  handler: function(request, reply) {
    var levelPlaylist = request.payload.playlist;
    Mission.find({level: levelPlaylist}, function(err, data){
      if(!err){
        return reply(data);
      }
      return reply(Boom.badRequest('Could not find playlist:('));
    });
  }
};
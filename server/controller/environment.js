'use strict';

var Joi = require('joi'),
  Boom = require('boom'),
  Config = require('../config/config');

exports.getEnvName = {
    handler: function (request, reply) {
      return reply({name: Config.environment.name});
    }
};

exports.setEnvName = {
    handler: function(request, reply) {
        if(request.query.name){
            Config.environment.name = request.query.name;
            return reply(Config.environment.name + 'successfully set');
        }
        return reply('Could not set environment name').code(500);
    }
};
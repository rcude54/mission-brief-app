'use strict';

var Joi = require('joi'),
  Boom = require('boom'),
  Message = require('../model/briefMessage');

exports.getMessages = {
    handler: function (request, reply) {
      var messageQuery = {env: request.query.env};
      Message.find(messageQuery, function(err, messages){
        if(!err){
          return reply(messages);
        }
        return reply('Could not find brief message').code(500);
      });
    }
};

exports.setMessage = {
    handler: function(request, reply) {
        var newMessage = request.payload;
        Message.findOneAndUpdate({env: newMessage.env, result: newMessage.result}, newMessage, 
          {upsert:true},function(err, message){
          if (err) { 
            return reply('Could not update message').code(500);
          }
          return reply('Message successfully set');
        });
    }
};
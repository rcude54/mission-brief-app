'use strict';

var mongoose = require('mongoose'),
  Boom = require('boom'),
  Schema = mongoose.Schema;

/**
  * @module  BriefMessage
  * @description Model for the mission object that can be created and displayed 
*/

var MessageSchema = new Schema({

  /** 
   * Message header string
  */
  header : {type: String},

  /** 
   * Message text string
  */
  text : {type: String},

  /**
   * Environment that the specific message should display on
   */
  env: {type: String},

  /**
   * Boolean value that sets whether the mission is a mission result or not
   */
  result: {type: Boolean}
});

var message = mongoose.model('message', MessageSchema);

/** export schema */
module.exports = message;
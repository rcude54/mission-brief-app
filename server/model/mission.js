'use strict';

var mongoose = require('mongoose'),
  Boom = require('boom'),
  Schema = mongoose.Schema;

/**
  * @module  Mission
  * @description Model for the mission object that can be created and displayed 
*/

var MissionSchema = new Schema({

  /** 
   * Name of the mission
  */
  name : { type: String, unique: true, required: true },

  /** 
   * Optional tagline associated with the mission
  */
  tagline : {type: String},

  /**
   * Different levels the missions falls into
   */
  levels: [Number]

});

var mission = mongoose.model('mission', MissionSchema);

mission.findByName = function(missionName, cb) {
  this.findOne({name: missionName}, cb);
};

mission.findByLevel = function(missionLevel, cb) {
  this.find({levels : missionLevel}, cb);
};

/** export schema */
module.exports = mission;
'use strict';

var mongoose = require('mongoose'),
  Boom = require('boom'),
  Schema = mongoose.Schema;

/**
  * @module  Playlist
  * @description Model for a playlist of mission objects 
*/

var PlaylistSchema = new Schema({

  /** 
   * List of the missions in the playlist
  */
  missions : {type: [String], required: true},

  /** 
   * Level of the playlist
  */
  level : {type: Number, required: true},

  /** 
   * Flag to check whether it's a house or warehouse playlist
  */
  isHouse : {type: Boolean, required: true}

});

var playlist = mongoose.model('playlist', PlaylistSchema);

playlist.getMissionFromIndex = function(playlistLevel, index, environment) {
  this.findOne({level: playlistLevel, isHouse: environment === 'House'}, function(data){
    return data[index];
  });
};

/** export schema */
module.exports = playlist;
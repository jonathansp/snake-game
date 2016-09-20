'use strict';

const util = require('util');

module.exports = function(Player) {
  Player.move = function(id, direction, cb) {
    console.log(">> " + id);
    Player.findById(id, function(status, player) {
      console.log(status);
      console.log(player);
    })
    return cb(null, {"result": false})
  },
  Player.remoteMethod(
    'move',
    {
      accepts: [
        {
          arg: 'id', 
          type: 'number', 
          required: true,
          http: { source: "path" }
        },
        {
          arg: "direction", 
          type: "string",
          default: "down",
          http: { source: "body" },
          required: false
        }
      ],
      http: {'path': '/:id/move', verb: 'post'},
      returns: {arg: 'context', 'type': 'object'},
      notes: "Performs a move and returns the new context resulting from it."
    }
  );
};

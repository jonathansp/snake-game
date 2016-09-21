'use strict';

import Engine from '../../core/engine';

module.exports = function(Player) {
  Player.reset = function(id, cb) {

    Player.findById(id, function(error, player) {
      if(error) {
        return cb(null, null, error);
      }

      player.context.destroy(function(error) {
        if(error) {
          return cb(null, null, error);
        }

        player.context.create(function(error, ctx) {
          if(error) {
            return cb(null, null, error);
          } else {
            return cb(null, ctx);
          }
        });
      });
    });
  },
  Player.move = function(id, direction, cb) {

    Player.findById(id, function(error, player) {

      if(error) {
        return cb(null, null, { 
          'info': error, 
          'msg': 'Failed to load player with id ' + id
        });
      }

      player.context(function(error, previousCtx) {

        if(previousCtx) {

          let engine = new Engine({'context': previousCtx});

          if(engine.step(direction)) {
            player.context.update(engine, function(err, context) {
              return cb(null, engine);
            });
          } else {
            return cb(null, null, {'msg': 'Game Over'});
          }

        } else {

          player.context.create(function(err, newCtx) {

            if(error) {
              return cb(null, null, { 
                'info': error, 
                'msg': 'Failed to create player context for id ' + id
              });
            } else {
              return cb(null, newCtx);
            }
          }); 
        }
      });
    })
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
          required: false
        }
      ],
      http: {'path': '/:id/move', verb: 'post'},
      returns: [
        {arg: 'context', 'type': 'object'},
        {arg: 'error', 'type': 'object'}
      ],
      notes: "Performs a move and returns the new context resulting from it."
    }
  ),
  Player.remoteMethod(
    'reset',
    {
      accepts: [
        {
          arg: 'id', 
          type: 'number', 
          required: true,
          http: { source: "path" }
        }
      ],
      http: {'path': '/:id/reset', verb: 'post'},
      returns: [
        {arg: 'context', 'type': 'object'},
        {arg: 'error', 'type': 'object'}
      ],
      notes: "Resets previous context and returns a new context."
    }
  );
};

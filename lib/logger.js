(function() {
  var Logger, logger, _;

  logger = require('fluent-logger');

  _ = require('lodash');

  module.exports = Logger = (function() {
    function Logger(option) {
      var host, port, type;
      if (option == null) {
        option = {};
      }
      type = option.type, host = option.host, port = option.port;
      type = option.type || 'fluentd.babascript';
      host = option.host || '153.121.44.172';
      port = option.port || '24225';
      logger.configure(type, {
        host: host,
        port: port
      });
    }

    Logger.prototype.load = function(baba, next) {
      return next();
    };

    Logger.prototype.connect = function() {
      return console.log('connect module');
    };

    Logger.prototype.send = function(task) {
      var data;
      console.log('send...');
      data = {
        baba: 'script',
        type: task.type,
        name: task.name,
        key: task.key,
        cid: task.cid,
        status: 'start',
        at: Date.now(),
        task: task
      };
      return logger.emit("task", data);
    };

    Logger.prototype.receive = function(result) {
      var r, send, _i, _len;
      console.log('receive...');
      if (!_.isArray(result)) {
        for (_i = 0, _len = result.length; _i < _len; _i++) {
          r = result[_i];
          send(r);
        }
      } else {
        send(result);
      }
      return send = function(r) {
        var data;
        data = {
          baba: 'script',
          type: r.task.type,
          name: r.task.name,
          key: r.task.key,
          value: r.value,
          worker: r.__worker,
          cid: r.task.cid,
          status: 'finish',
          at: Date.now(),
          task: r.task
        };
        return logger.emit("task", data);
      };
    };

    return Logger;

  })();

}).call(this);

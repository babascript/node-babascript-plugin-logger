logger = require 'fluent-logger'
_ = require 'lodash'

module.exports = class Logger
  constructor: (option = {}) ->
    {type, host, port} = option
    type = option.type || 'fluentd.babascript'
    host = option.host || '153.121.44.172'
    port = option.port || '24225'
    logger.configure type, {host: host, port: port}

  load: (baba, next) ->
    next()

  connect: ->
    console.log 'connect module'

  send: (task) ->
    console.log 'send...'
    data =
      baba: 'script'
      type: task.type
      name: task.name
      key: task.key
      cid: task.cid
      status: 'start'
      at: Date.now()
      task: task
    logger.emit "task", data

  receive: (result) ->
    console.log 'receive...'
    if !_.isArray result
      for r in result
        send r
    else
      send result
    send = (r) ->
      data =
        baba: 'script'
        type: r.task.type
        name: r.task.name
        key: r.task.key
        value: r.value
        worker: r.__worker
        cid: r.task.cid
        status: 'finish'
        at: Date.now()
        task: r.task
      logger.emit "task", data

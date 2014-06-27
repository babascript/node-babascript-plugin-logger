process.env.NODE_ENV = 'test'

path = require 'path'
assert = require 'assert'
Baba = require "../../node-babascript/lib/script"
Client = require "../../node-babascript-client/lib/client"
Logger = require "../lib/logger"

baba = new Baba "baba"
baba.set "logger", new Logger()

baba.こんばんわ {format: 'boolean'}, (result) ->
  console.log result
  

# describe 'test', ->
#
#   script = require path.resolve()
#
#   it 'should be hoge', ->
#
#     return assert.equal 'hoge', script()

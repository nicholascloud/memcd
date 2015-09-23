#!/usr/bin/env node
'use strict';
var os = require('os');
var memjs = require('memjs');

function help(cmd) {
  switch (cmd || '') {
    case 'stats':
      return console.log('memcd [--host=(user:pass@)host:port,...] stats');
    case 'flush':
      return console.log('memcd [--host=(user:pass@)host:port,...] flush');
    case 'get':
      return console.log('memcd [--host=(user:pass@)host:port,...] get key');
    case 'set':
      return console.log('memcd [--host=(user:pass@)host:port,...] set key value [expiration]');
    case 'add':
      return console.log('memcd [--host=(user:pass@)host:port,...] add key value [expiration]');
    case 'replace':
      return console.log('memcd [--host=(user:pass@)host:port,...] replace key value [expiration]');
    case 'delete':
      return console.log('memcd [--host=(user:pass@)host:port,...] delete key');
    case 'increment':
      return console.log('memcd [--host=(user:pass@)host:port,...] increment key amount [expiration]');
    case 'decrement':
      return console.log('memcd [--host=(user:pass@)host:port,...] decrement key amount [expiration]');
    case 'help':
      return console.log('aren\'t you clever!');
    default:
      console.log('Usage: memcd [--host=(user:pass@)host:port,...] command ...args');
      console.log('Examples:');
      console.log('  $ memcd get some:key');
      console.log('  $ memcd set some:key value 1000');
      console.log('  $ memcd --host=localhost:11211 stats');
      console.log('  $ memcd help');
      console.log('  $ memcd help [command]');
      console.log(/*newline*/);
      console.log('Note:');
      console.log('  If --host is specified it MUST be the first argument to memcd.');
      console.log(/*newline*/);
      console.log('Available commands:');
      console.log('  ' + Object.keys(getCommands(null)).join(', '));
      console.log(/*newline*/);
      return;
    }
}

function getCommands(mc) {
  function handleError(err) {
    if (!err) return;
    console.error(err);
    help();
    process.exit(1);
  }

  /**
   * @see http://amitlevy.com/projects/memjs/
   */
  return {
    'help': function (cmd) {
      help(cmd);
      process.exit(0);
    },

    'stats': function () {
      mc.stats(function (err, server, stats) {
        handleError(err);
        console.log(server);
        console.log(stats);
        process.exit(0);
      })
    },

    'flush': function () {
      mc.flush(function (lastErr, result) {
        handleError(lastErr);
        console.log(result);
        process.exit(0);
      })
    },

    'get': function (key) {
      mc.get(key, function (err, value) {
        handleError(err);
        console.log((value || '').toString());
        process.exit(0);
      })
    },

    'set': function (key, value, expiration) {
      mc.set(key, value, function (err, success) {
        handleError(err);
        console.log(success);
        process.exit(0);
      }, expiration);
    },

    'add': function (key, value, expiration) {
      mc.set(key, value, function (err, success) {
        handleError(err);
        console.log(success);
        process.exit(0);
      }, expiration);
    },

    'replace': function (key, value, expiration) {
      mc.set(key, value, function (err, success) {
        handleError(err);
        console.log(success);
        process.exit(0);
      }, expiration);
    },

    'delete': function (key) {
      mc.delete(key, function (err, success) {
        handleError(err);
        console.log(success);
        process.exit(0);
      });
    },

    'increment': function (key, amount, expiration) {
      if (arguments.length === 1) {
        increment = 1;
      }
      mc.increment(key, amount, function (err, success, value) {
        handleError(err);
        console.log(success, value);
        process.exit(0);
      }, expiration);
    },

    'decrement': function (key, amount, expiration) {
      if (arguments.length === 1) {
        increment = 1;
      }
      mc.decrement(key, amount, function (err, success, value) {
        handleError(err);
        console.log(success, value);
        process.exit(0);
      }, expiration);
    },
  };
}

var DEFAUT_HOST = 'localhost:11211';

function getHost(args) {
  if (!args.length) {
    return DEFAUT_HOST;
  }
  if (args[0].search(/^--host=/) !== 0) {
    return DEFAUT_HOST;
  }
  return args.shift().replace(/^--host=/, '');
}

var args = process.argv.slice(2);
var host = getHost(args);
//console.log('>>', host);
var mc = memjs.Client.create(host);
var cmd = args[0] || 'help';
var cmdArgs = args.slice(1);
//console.log('>>', cmd);
//console.log('>>', cmdArgs);

getCommands(mc)[cmd].apply(null, cmdArgs);

'use strict';

require('dotenv').config({ path: './variables.env' });
const connectToDatabase = require('./db');
const Event = require('./models/events.js');

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  connectToDatabase()
    .then(() => {
      Event.create(JSON.parse(event.body))
        .then(event => callback(null, {
          statusCode: 200,
          body: JSON.stringify(event)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not create the event.'
        }));
    });
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Event.findById(event.pathParameters.id)
        .then(event => callback(null, {
          statusCode: 200,
          body: JSON.stringify(event)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the event.'
        }));
    });
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Event.find()
        .then(events => callback(null, {
          statusCode: 200,
          body: JSON.stringify(events)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the events.'
        }))
    });
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Event.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
        .then(event => callback(null, {
          statusCode: 200,
          body: JSON.stringify(event)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the events.'
        }));
    });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      Event.findByIdAndRemove(event.pathParameters.id)
        .then(event => callback(null, {
          statusCode: 200,
          body: JSON.stringify({ message: 'Removed event with id: ' + event._id, event: event })
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the event.'
        }));
    });
};

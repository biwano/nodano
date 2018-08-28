const express = require('express');

function init(nodano) {
  const router = express.Router();
  const debug = nodano.config.debug || false;

  router.use((req, res, next) => {
    res.sendResponse = function response(err, payload) {
      const status = err ? 'ko' : 'ok';
      const message = err;
      res.json({ status, message, payload });
    };
    res.sendData = function sendData(data) {
      res.Logger.debug(`Network ${data}`);
      res.json(data);
    };
    res.sendDataVersion = function sendDataVersion(data) {
      res.json({ __v: data.__v });
    };
    res.sendSuccess = function success(data) {
      if (!debug || data === undefined) {
        res.sendResponse(data);
      } else {
        res.sendData(data);
      }
    };
    res.sendError = function error(err, payload) {
      res.sendResponse(`error_${err}`, payload);
    };
    res.sendUnexpectedError = function unexpected(err) {
      res.Logger.error(err);
      res.sendError('unexpected', err);
    };
    res.sendException = function unexpected(exception) {
      res.Logger.exception(exception);
      res.sendError('unexpected', exception);
    };
    next();
  });
  return router;
}
function destroy() {}

module.exports = { priority: 90, init, destroy };


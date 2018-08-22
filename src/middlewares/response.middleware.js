const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
  res.sendResponse = function response(err, payload) {
    const status = err ? 'ko' : 'ok';
    const message = err;
    res.json({ status, message, payload });
  };
  res.sendSuccess = function success() {
    res.sendResponse();
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
  res.sendData = function sendData(data) {
    res.Logger.debug(data);
    res.json(data);
  };
  res.sendDataVersion = function sendDataVersion(data) {
    res.json({ __v: data.__v });
  };
  next();
});


module.exports = router;


const express = require('express');
const session = require('express-session');
const cors = require('cors');
const MongoStore = require('connect-mongo')(session);

function createRouter(connection) {
  const router = express.Router();
  // Sessions
  router.use(session({
    secret: 'the secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false,
      expires: new Date(2030, 1, 1),
    },
    store: new MongoStore({ mongooseConnection: connection }),
    collection: 'session',
  }));

  // Injecting connected user
  router.use(async (req, res, next) => {
    try {
      if (!req.session.user) {
        // Creating user in database
        let newUser = {
          type: 'guest',
          name: 'Guest',
          auth: {},
        };
        newUser = await res.M.User(newUser).save();
        req.session.user = newUser;
      }
      // Injecting
      req.user = req.session.user;
      next();
    } catch (err) {
      // Oups!
      res.sendUnexpectedError(err);
    }
  });

  // Configuring Cors
  const corsOptions = { origin: true, credentials: true };
  router.use(cors(corsOptions));
  router.options('*', cors(corsOptions));
  return router;
}

module.exports = createRouter;


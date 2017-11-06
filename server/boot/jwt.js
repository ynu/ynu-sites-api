'use strict';
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY || null;

module.exports = function(app) {
  const User = app.models.User;
  const AccessToken = app.models.AccessToken;

  User.prototype.createAccessToken = function(ttl, cb) {
    const userSettings = this.constructor.settings;
    const expiresIn = Math.min(ttl || userSettings.ttl, userSettings.maxTTL);
    // https://stackoverflow.com/questions/45207104/how-to-set-jwt-token-expiry-time-to-maximum-in-nodejs
    const accessToken = jwt.sign({id: this.id}, secretKey);
    return cb ? cb(null, Object.assign(this, {accessToken})) : {id: accessToken};
  };

  User.logout = function(tokenId, fn) {
    // You may want to implement JWT black list here
    fn();
  };

  AccessToken.resolve = function(id, cb) {
    if (id) {
      try {
        const data = jwt.verify(id, secretKey);
        cb(null, {userId: data.id});
      } catch (err) {
        // Should override the error to 401
        cb(err);
      }
    } else {
      cb();
    }
  };
};

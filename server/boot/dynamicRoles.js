module.exports = function (app) {
  const Role = app.models.Role;
  const accessRolename = 'sites';
  const admin = app.models.admin;

  Role.registerResolver(accessRolename, function (role, context, cb) {
    //Q: Is the user logged in? (there will be an accessToken with an ID if so)
    const userId = context.accessToken.userId;
    if (!userId) {
      //A: No, user is NOT logged in: callback with FALSE
      return process.nextTick(() => cb(null, false));
    }
    admin.findById(userId, function(err, record) {
      if (err) return cb(err);
      if (record.scope === accessRolename) {
        return cb(null, true);
      }
      else {
        return cb(null, false);
      }
    });
  });
};

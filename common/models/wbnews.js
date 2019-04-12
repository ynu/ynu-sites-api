'use strict';

module.exports = function(Model) {
  // http://loopback.io/doc/en/lb3/Exposing-models-over-REST.html#read-only-endpoints-example
  // http://www.learnsteady.com/how-to-disable-loopback-api-endpoints/
  // loopback deprecated Model.disableRemoteMethod is deprecated. Use Model.disableRemoteMethodByName instead.
  // https://apidocs.strongloop.com/loopback/#model-disableremotemethodbyname
  Model.disableRemoteMethodByName('create'); // Removes (POST) /model
  Model.disableRemoteMethodByName('upsert'); // Removes (PUT) /model
  Model.disableRemoteMethodByName('deleteById'); // Removes (DELETE) /model/:id
  Model.disableRemoteMethodByName('updateAll'); // Removes (POST) /model/update
  Model.disableRemoteMethodByName('prototype.updateAttributes'); // Removes (PUT) /model/:id
  Model.disableRemoteMethodByName('createChangeStream'); // Removes (GET|POST) /model/change-stream
  Model.disableRemoteMethodByName('replaceOrCreate'); // Removes PUT /model and POST /model/replaceOrCreate
  Model.disableRemoteMethodByName('upsertWithWhere'); // Removes POST /model/upsertWithWhere
  Model.disableRemoteMethodByName('replaceById'); // Removes PUT /model/{id} and POST /model/{id}/replace
  Model.disableRemoteMethodByName('exists'); // Removes HEAD /model/{id}

  Model.byOwnerOfLatest = function(cb) {
    const ds = Model.dataSource;
    const sql =
      'select owner, max(wbdate) as latestdate, max(wbnewsid) as newestnewsid from wbnews group by owner';
    ds.connector.query(sql, function(err, wbnews) {
      console.info(`err ${err}, wbnews ${wbnews}`);
      if (err) console.error(err);
      cb(err, wbnews);
    });
  };

  Model.remoteMethod('byOwnerOfLatest', {
    http: {verb: 'get'},
    description: 'Get list of latest wbnews by owner ',
    accepts: [],
    returns: {arg: 'data', type: ['wbnews'], root: true},
  });

  Model.latestDaysUpdateCounts = function(days, cb) {
    const ds = Model.dataSource;
    const sql = `select owner, count(owner) as count from wbnews where owner in (select distinct wbfirmid from wbfirm) and datediff(curdate(), wbdate) < ${days} group by owner;`;
    ds.connector.query(sql, function(err, wbnews) {
      console.info(`err ${err}, wbnews ${wbnews}`);
      if (err) console.error(err);
      cb(err, wbnews);
    });
  };

  Model.remoteMethod('latestDaysUpdateCounts', {
    http: {verb: 'get'},
    description: 'Get the news count since the last n days',
    accepts: [
      {arg: 'days', type: 'number', required: true, http: {source: 'path'}},
    ],
    http: {path: '/latestDaysUpdateCounts/:days', verb: 'get'},
    returns: {arg: 'data', type: ['wbnews'], root: true},
  });
};

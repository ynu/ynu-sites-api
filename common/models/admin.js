// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-example-access-control
// This file is licensed under the Artistic License 2.0.
// License text available at https://opensource.org/licenses/Artistic-2.0

module.exports = function(Model) {
    // http://loopback.io/doc/en/lb3/Exposing-models-over-REST.html#read-only-endpoints-example
    // http://www.learnsteady.com/how-to-disable-loopback-api-endpoints/
    // loopback deprecated Model.disableRemoteMethod is deprecated. Use Model.disableRemoteMethodByName instead.
    // https://apidocs.strongloop.com/loopback/#model-disableremotemethodbyname
    // Model.disableRemoteMethodByName('create');     // Removes (POST) /model
    Model.disableRemoteMethodByName('upsert');     // Removes (PUT) /model
    Model.disableRemoteMethodByName('deleteById'); // Removes (DELETE) /model/:id
    Model.disableRemoteMethodByName('updateAll');  // Removes (POST) /model/update
    Model.disableRemoteMethodByName('prototype.updateAttributes'); // Removes (PUT) /model/:id
    Model.disableRemoteMethodByName('createChangeStream'); // Removes (GET|POST) /model/change-stream
    Model.disableRemoteMethodByName('replaceOrCreate'); // Removes PUT /model and POST /model/replaceOrCreate
    Model.disableRemoteMethodByName('upsertWithWhere'); // Removes POST /model/upsertWithWhere
    Model.disableRemoteMethodByName('replaceById'); // Removes PUT /model/{id} and POST /model/{id}/replace
    Model.disableRemoteMethodByName('exists'); // Removes HEAD /model/{id}
};
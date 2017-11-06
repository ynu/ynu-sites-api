module.exports = function(app) {
  const admin = app.models.admin;
  const defaultAdmin = {username: 'sites', email: 'sites@ynu.edu.cn',
    password: 'sites@ynu', scope: 'sites'};
  admin.find({where: {username: 'sites', email: 'sites@ynu.edu.cn', scope: 'sites'}}, function(err, foundRecords) {
    if (err) throw err;
    if (foundRecords.length === 0) {
      admin.create([defaultAdmin], function(err, createdRecords) {
        if (err) throw err;
        console.log('Created admins:', createdRecords);
      });
    }
  });
};

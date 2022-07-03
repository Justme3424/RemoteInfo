const AdminBro = require('admin-bro');
const PC = require('../models/PCs')
const Users = require('../models/Users')
const adminBro = new AdminBro({
   rootPath: '/admin',
   loginPath: '/admin/login',
   resources: [PC, Users],
   branding: {
     companyName: 'AdminBro Tutorial',
     softwareBrothers: false,
   }
});
module.exports = adminBro;





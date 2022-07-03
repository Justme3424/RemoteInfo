const connection = require('./database/db')
connection.once('open', ()=> console.log('Connesso a MongoDB'))
connection.on('error', ()=> console.log('Errore di connessione: '+ error))

const PC = require('./models/PCs')
const Users = require('./models/Users')

// Requirements
const express = require('express')
const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const bcrypt = require('bcrypt')

// We have to tell AdminJS that we will manage mongoose resources with it
AdminJS.registerAdapter(require('@adminjs/mongoose'))
// express server definition
const app = express()
const canModifyUsers = ({ currentAdmin }) => currentAdmin && currentAdmin.role === 'admin'


// Pass all configuration settings to AdminJS
const adminJs = new AdminJS({
  resources: [{
    resource: PC
  }, {
    resource: Users,
    options: {
      navigation: false,
      properties: {
        encryptedPassword: {
          isVisible: true,
        },
        password: {
          type: 'string',
          isVisible: {
            list: false, edit: true, filter: false, show: false,
          },
        },
      },
      actions: {
        new: {
          before: async (request) => {
            if(request.payload.password) {
              request.payload = {
                ...request.payload,
                encryptedPassword: await bcrypt.hash(request.payload.password, 10),
                password: undefined,
              }
            }
            return request
          },
        }/*,
        edit: { isAccessible: canModifyUsers },
        delete: { isAccessible: canModifyUsers },
        new: { isAccessible: canModifyUsers },*/
        
      }
    }
  }],
  branding: {
    companyName: 'REMOTEINFO',
    logo: '/logo.jpg',
    softwareBrothers: false,
  },
  locale: {
    translations: {
        messages: {
          loginWelcome: 'Lo stato dei tuoi pc sempre a portata di mano', // the smaller text
      },
        labels: {
            loginWelcome: 'Benvenuto a RemoteInfo', // this could be your project name
      },
      actions: {
        new: 'Add',
      },
    },
   
  },
  loginPath: '/admin/login',
  rootPath: '/admin',
  
})

// Check login
const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (Name, Password) => {
    const user = await Users.findOne({ Name, Password })
    if (user){
      return user
    }
    
    /*if (user) {
     const match = await bcrypt.compare(Password, user.encryptedPassword, function(err, res){
      if (match){  
        console.log(user)
        return user
      }
      })
    }
    return false*/
  },
  cookiePassword: 'some-secret-password-used-to-secure-cookie',
})



app.use(adminJs.options.rootPath, router)
app.use(adminJs.options.loginPath, router)
app.use(express.static('public'));


app.listen(3000, ()=>{
    console.log('Server: http://localhost:3000/admin')
})

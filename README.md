# Posting App - Back End

**Frontend** (React) - **Backend** (Node.js, Express) - **Database** (MongoDB)

- [**Find frontend here**](https://github.com/beatanemeth/posting-app-front-end)

---

## Technical Details

### Node version used:

- v18.12.0

### MongoDB version used:

- [MongoDB Community Server](https://www.mongodb.com/what-is-mongodb)
- v6.0.4

### Check for dependencies:

- open **package.json** file

### How to install dependencies:

- open Terminal or Command Prompt
- change to working directory (where the file is located)  
  `$ cd /path/to/directory`
- install dependences  
  `$ npm install`
- install and run MongodDB [depending on your OS](https://www.mongodb.com/docs/v6.0/administration/install-community/)

### How to use:

#### .env

- Rename the **.envexample** to **.env** and replace with your data.
- Store .env file in the root directory of your project.

#### Run backend server

- open Terminal or Command Prompt
- change to working directory (where the file is located)  
  `$ cd /path/to/directory`
- run the app.js file  
  `$ npm run dev`
- the server will start at **localhost:8000**
- when finished with work stop the server  
  `ctrl+C`

#### Run frontend server

- **frontend** starts on **localhost:3000** and makes request to **backend** on **localhost:8000**

#### Run database server

- open one more Terminal or Command Prompt to start **MongoDB Shell**
- check the status of the server:  
  `$ sudo service mongod status`
- start the server:  
  `$ sudo service mongod start`
- check the status of the server again:  
  `$ sudo service mongod status`
- get into the interactive test shell on your terminal:  
  `$ mongosh`  
  `test>  `
- [run commands](https://www.mongodb.com/docs/mongodb-shell/run-commands/)
- [perform CRUD operations](https://www.mongodb.com/docs/mongodb-shell/crud/)
- when finised with work:  
  ` test> quit`
- stop the server:  
  `$ sudo service mongod stop`
- check the status of the server:  
  `$ sudo service mongod status`
- database server runs on **localhost:27017**

### Hosts:

- **frontend** (React App) starts on **localhost:3000**
- **backend** (Node.js server) runs on **localhost:8000**
- **database server** (MongoDB) runs on **localhost:27017**

### Insert initial data into DB:

- open Terminal or Command Prompt
- change to working directory (where the file is located)  
  `$ cd /path/to/directory`  
  `$ node initialData.js`

---

### Architecture

![Backend Architecture](/src/public/images/posting-app-backend-architecture.jpg)

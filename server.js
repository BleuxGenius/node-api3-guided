const express = require('express'); // importing a CommonJS module
// const morgan = require("morgan")
const helmet = require("helmet")

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();



// global middleware 
server.use(express.json()); // built in middleware
// server.use(morgan("dev")); // third party middleware
server.use(helmet()) // custom middleware (www.npmjs.com)
// server.use(logger) // custom middleware example 

// there is global middleware and there is local middleware. 

// local middleware example =>


// server.get('/', logger, (req, res) => {
//   const nameInsert = (req.name) ? ` ${req.name}` : '';

//   res.send(`
//     <h2>Lambda Hubs API</h2>
//     <p>Welcome${nameInsert} to the Lambda Hubs API !!!!!!</p>
//     `);
// });

// routes and endpoints 
server.use('/api/hubs', logger, gatekeeper, hubsRouter);

server.get('/', logger, greeter ,(req, res) => {
  // const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${req.name} to the Lambda Hubs API !!!!!!</p>
    `);
});

module.exports = server;

// Request handler functions 
// custom middle ware example
// you can also import them in through separate files 
// if i use arrow functions i have to declare them before they are used 
// three amigas
function logger(req,res, next) {
  console.log(` ${req.method} Request to ${req.originalUrl}`)
next();
}

function greeter(req, res, next) {
  req.cohort = "Web 26";
  next();
}

// write a gate keeper middleware 
function gatekeeper(req, res, next) {
// reads a password from req.header
const password = req.headers.password;
//  if the password is "mellon" 
if(password && password.toLowerCase()=== "mellon") {
// let the request continue
next();
} else {
// if the password is not "mellon" send a status code of 400 and a message to the client 
res.status(401).json({ you: "shall not pass!"})
}
}

// function fetchHubs() {
//   const endpoint = "http://lotr.com/hubs";
//   const options = {
//     headers: {
//       password: "mellon"
//     }
//   }
//   axios.get (endpoint, options).then().catch()
// }
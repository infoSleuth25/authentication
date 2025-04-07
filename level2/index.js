const http = require('http');
const app = require('./app');
const port = process.env.PORT || 4000;

const server = http.createServer(app);

server.listen(port,function(){
    console.log(`App is listening on the port ${port}.`);
})
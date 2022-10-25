const http = require("http");

const server = http.createServer((request, response) => {
  console.log("server runing")
  if (request.url === "/") {
    response.write("Home")
    response.end()
  } else if (request.url === "/class"){
    response.write("Class")
    response.end()
  }

})

server.listen(3000)

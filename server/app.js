const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);


io.on("connection", (socket) => {
  console.log('hhh')
});

module.exports = {
  app,
  server,
};

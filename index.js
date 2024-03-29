const SMTPServer = require("smtp-server").SMTPServer;

const server = new SMTPServer({
  allowInsecureAuth: true,
  authOptional: true,
  rejectUnauthorized: false,
  //   secure: true,
  onConnect(session, cb) {
    console.log("onConnect==> ", session.id);
    cb();
  },
  onMailFrom(address, session, cb) {
    console.log("onMailFrom==> ", address.address, session.id);
    cb();
  },
  onRcptTo(address, session, cb) {
    console.log("onRcptTo==> ", address.address, session.id);
    cb();
  },
  onData(stream, session, cb) {
    stream.on("data", (data) => {
      console.log("data===> ", `${data.toString()}`);
    });
    stream.on("end", cb);
  },
});

server.listen(25, () => {
  console.log("Server listening on port 25");
});

// server.listen(465,() => {
//     console.log("Server listening on port 465")
// });

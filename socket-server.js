var express=require("express");

var app=express();

var http= require("http");

var server= http.createServer(app);

var io = require("socket.io")(server);

var port=process.env.port || 3000;

io.on("connection",client=>{
  console.log("new client connected",client.id);
  client.emit("acknowledge",{Data:connected});
  
    client.on("msgToServer", (chatterName, msg) => {
    console.log(chatterName + " says : " + msg);
    client.broadcast.emit("msgToClient", chatterName , msg);
    client.emit("msgToClient", 'Me', msg);
    })

    client.on("disconnect",()=>{
    console.log("client is disconnected" + client.id);
   })
})


app.get('/',(req,res)=>{
    res.sendFile(__dirname,+"/public/socket-client.js")
})

server.listen(port,()=>{
console.log('socket server started')
})
